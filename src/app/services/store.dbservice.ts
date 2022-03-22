import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import * as firebase from 'firebase';
import { GeoFire } from "geofire";
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { CREATE_BUSINESS_TYPE } from '../translate/langs.trans';
import { CollectionReference } from '@firebase/firestore-types';
import { TranslateService } from '../translate/translate.service';
import { Branch } from '../model/branch';
import { User } from '../model/user';
import { Services } from '../model/services';
import { UserDBService } from './user.dbservice';
import { StoreService } from './store.service';
import { CategoryService } from '../model/categoryService.service';
import { Store } from '../model/store';
import { GeoFirestore } from 'geofirestore';
import { Geokit } from 'geokit';
import { BranchStaff } from '../model/branchstaff';
import { map, take } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StoreDBService {

  private latitude: number;
  private longitude: number;

  public

  private bussinessType: AngularFirestoreCollection<any>;

  private storegaeRef: firebase.storage.Reference;

  private dbRef: any;
  private geoFire: any;
  geofirestore: GeoFirestore;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase,
    private translateService: TranslateService, private userDBService: UserDBService,
    private storeService: StoreService) {

    // this.dbRef = this.db.list('/locations');
    // this.geoFire = new GeoFire(this.dbRef.query.ref);

    this.geofirestore = new GeoFirestore(firebase.firestore() as any);

  }


  getbusinessTypes(busName: string) {
    console.log('Passed business type is ' + busName);
    if (this.translateService.currentLang == 'en') {
      console.log('English query with business name ' + busName);
      this.bussinessType = this.afs.collection<any>('bussinessTYpes', ref => ref.where('name', '==', busName));
      console.log('collection for business types is ' + this.bussinessType);
    }
    else {
      this.bussinessType = this.afs.collection<any>('bussinessTypes', ref => ref.where('arabicName', '==', busName));
    }

    // this.bussinessType.doc('salons').ref.get().then(doc=>{

    //     console.log('document data for busines types '+doc.data().id);

    // });

    return this.bussinessType.snapshotChanges().pipe(map(actions => {

      return actions.map(action => {

        const data = action.payload.doc.data();
        const id = action.payload.doc.id;

        return { id, ...data };

      });
    }));

  }


  async createStoreBranch(storeId, branch: Partial<Branch>, staff: Partial<User>[], services: Partial<Services>[], callBack, token: string) {


    let employees: {

      userId: string;

      roleId: string;
    }[] = [];

    let i = 0;

    console.log('this.storeService.getBranch().storeLogoURL is ' + this.storeService.getBranch().storeLogoURL);

    let branchCollection = this.afs.collection('branches');

    let data: Partial<Branch> = {
      name: branch.name,
      arabicName: branch.arabicName,
      storeId: storeId,
      storeLogoURL: this.storeService.getBranch().storeLogoURL,
      address: branch.address,
      schedule: branch.schedule,
      location: branch.location,
      setting: {
        booking: {
          booking_hours_advance: 0,
          cancel_upto_hours_advance: 0,
          allow_staff_selection: true,
          allow_booking_overlap: false,
          online_policy: ''

        },
        calendar: {
          time_slot_interval: '15',
          week_start_day: 0
        },
        general: {
          rtlSet: false
        }
      }
      // services: services
    };

    branchCollection.add(data)

      .then((docRef: DocumentReference) => {

        docRef.get().then(async (docSnapshot2: DocumentSnapshot) => {

          const geoCollectionRef = this.geofirestore.collection('branch_location');

          const hash = Geokit.hash({ lat: data.location['latitude'], lng: data.location['longitude'] });

          const document = { branch_id: docSnapshot2.id, coordinates: new firebase.firestore.GeoPoint(+data.location['latitude'], +data.location['longitude']) };

          await geoCollectionRef.add(document).then(() => {
            console.log('location document has been set in Firestore');
          }, (error) => {
            console.log('Error: ' + error);
          });


          let branch: Partial<Branch> = this.storeService.getBranch();

          branch.id = docSnapshot2.id;

          this.storeService.setBranch(branch);

          // this.saveServices(services, branch.id);        //save into service_branch collection

          //**** Decide if you want to include the owner as a staff here so owner should be added
          //to the staff array as well e.x. staff.push(userDBService.getOwner());
          //but check if user.owner is true then skip to updateBranchAssignment

          if (staff && staff.length > 0) {

            staff.forEach(user => {

              if (user.uid != '') {

                this.userDBService.getRoleId('staff')

                .subscribe(roles => {

                  let branchStaff: Partial<BranchStaff> = {

                    branch: branch.id,

                    workName: user.name,

                    workArabicName: user.arabicName,

                    workEmail: user.email,

                    createdAt: new Date(),

                    ratings: [],

                    user: user.uid,

                    roles: [roles[0]['id']]
                  }

                  this.afs.collection('branch_staff').add(branchStaff)

                    .then(() => {

                      i++;

                      if (i == staff.length) {

                        let bookingIdCollection = this.afs.collection<any>('branch_booking_id');

                        bookingIdCollection.add({ branch: branch.id, booking_id: 0 });

                        callBack();
                      }

                    });

                });

              }
              else {

                this.userDBService.createUser(user, token)

                  .then(response => {

                    if (response['error'] && response['error'] !== 'The email address is already in use by another account.') {
                      //return;
                    }

                    this.userDBService.updateProfile(user, response.userId)

                      .then((docRef: DocumentReference) => {

                        docRef.get().then((docSnapshot: DocumentSnapshot) => {

                          user.uid = docSnapshot.data().uid;

                          // this.userDBService.updateBranchAssignments(docSnapshot.data().uid, docSnapshot2.id);

                          this.userDBService.getRoleId('staff')

                            .subscribe(roles => {

                              employees.push({ userId: docSnapshot.data().uid, roleId: roles[0]['id'] });

                              let branchStaffPath = `branche_staff/${branch.id}_${user.uid}`;

                              let branchStaff: Partial<BranchStaff> = {

                                branch: branch.id,

                                workName: user.name,

                                workArabicName: user.arabicName,

                                workEmail: user.email,

                                createdAt: new Date(),

                                user: user.uid,

                                roles: [roles[0]['id']]
                              }

                              this.afs.collection('branch_staff').add(branchStaff)

                                .then(() => {

                                  i++;

                                  if (i == staff.length) {

                                    let bookingIdCollection = this.afs.collection<any>('branch_booking_id');

                                    bookingIdCollection.add({ branch: branch.id, booking_id: 0 });

                                    callBack();
                                  }

                                });

                            });

                        })

                      });

                  });

              }

            });

          }
          else {

            let bookingIdCollection = this.afs.collection<any>('branch_booking_id');

            bookingIdCollection.add({ branch: branch.id, booking_id: 0 });

            callBack();

          }


        })

      });


  }


  updateUserBranchRole(role, userEmail, branchId, callback) {
    console.log(userEmail);
    const usersCollection: AngularFirestoreCollection<any> = this.afs.collection<any>('staff_users', ref => ref.where('email', '==', userEmail));

    usersCollection.get().toPromise()

      .then(users => {

        let userId = users.docs[0].data().uid;

        let user: Partial<User> = users.docs[0].data();
        console.log(user);
        this.userDBService.getRoleId('staff')

          .subscribe(roles => {

            let roleId = roles[0]['id'];


            let branchStaff = {

              branch: branchId,

              workName: user.name,

              workArabicName: user.arabicName,

              workEmail: user.email,

              createdAt: new Date(),

              user: userId,

              roles: [roles[0]['id']]
            }
            console.log(branchStaff);
            this.afs.collection('branch_staff').add(branchStaff).then(() => {

              callback();

            });

            // });

          });

      });


  }



  fillServices(services: Partial<Services>[], callback) {

    let i = 0;

    this.afs.collection<any>('categories')

      .snapshotChanges().pipe(map(actions => {

        return actions.map(action => {
          let data = action.payload.doc.data();
          let id = action.payload.doc.id;
          return { id, ...data };

        });
      }))

      .subscribe((categories: any[]) => {

        categories.forEach(category => {

          let parent_category: Partial<Services> = { label: '', children: [] };

          parent_category.label = category['name'];

          this.afs.collection<any>('subcategories', ref => ref.where('parent', '==', category['id']))

            .snapshotChanges().pipe(map(actions => {

              return actions.map(action => {
                let data = action.payload.doc.data();
                let id = action.payload.doc.id;
                return { id, ...data };

              });
            }))

            .subscribe(subcategories => {

              subcategories.forEach(subcategory => {

                let sub_category: { label: string, children: Partial<CategoryService>[] } = { label: '', children: [] };

                sub_category.label = subcategory['name'];

                this.afs.collection<any>('services', ref => ref.where('parent', '==', subcategory['id']))

                  .snapshotChanges().pipe(map(actions => {

                    return actions.map(action => {
                      let data = action.payload.doc.data();
                      let id = action.payload.doc.id;
                      return { id, ...data };

                    });
                  }))

                  .subscribe(services => {

                    services.forEach((service: Partial<CategoryService>) => {

                      sub_category.children.push(service);

                    });

                  });

                parent_category.children.push(sub_category);

              });

            });

          i++;

          services.push(parent_category);

          if (i == categories.length) {

            callback(services.slice());

          }

        });


      });



  }


  saveServices(services: Partial<Services>[], branchId: string) {

    services.forEach(category => {

      category.children.forEach(subcategory => {

        subcategory.children.forEach(service => {

          let serviceId: string = service.id;

          let newDocument = {

            branchId: branchId,

            serviceId: serviceId
          };

          let docPath: string = `branch_service/${branchId}_${serviceId}`;

          this.afs.doc(docPath).set(newDocument);

        });


      });

    });

  }


  saveLogo(file: string, storeId: string, callback) {

    let myFile: string = file.replace(/^data:image\/[a-z]+;base64,/, '');

    let filePath: string = 'stores/' + storeId + '/images/logo'

    this.storegaeRef = firebase.storage().ref().child(filePath);   //need to produce unique name

    let uploadTask: firebase.storage.UploadTask = this.storegaeRef.putString(myFile, 'base64');

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => { }, (error) => { }, () => {

      uploadTask.snapshot.ref.getDownloadURL().then(
        (downloadURL) => {

          // You get your url from here
          console.log('File available at', downloadURL);

          this.afs.collection('stores').doc(storeId).update({ logoURL: downloadURL }).then(() => {

            console.log('File available at', downloadURL);

            let branch = this.storeService.getBranch();

            branch.storeLogoURL = downloadURL;

            this.storeService.setBranch(branch);

            console.log('this.storeService.getBranch().storeLogoURL is ' + this.storeService.getBranch().storeLogoURL);

            callback();

          });

        }
      );

      // let fileURL = uploadTask.snapshot.downloadURL;

    });
  }


  getUserLocation(callback) {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        callback(this.latitude, this.longitude);

      });
    }
  }


  saveLocation(branchId: string) {

    let coords: number[] = [+this.latitude, +this.longitude];

    let key: string = 'branch_' + branchId;

    this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err));

  }


}
