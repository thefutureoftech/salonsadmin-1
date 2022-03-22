import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { OnInit, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Store } from '../model/store';

import { map, Observable, take } from "rxjs";
import { Branch } from '../model/branch';
import { mobiscroll } from '@mobiscroll/angular';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDBService implements OnInit {


  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private http: HttpClient) {

  }

  ngOnInit() {

  }


  createUser(user: Partial<User>, token: string) {

    user.createdBy = 'Super Admin';
    user.uid = 'dummy';
    // mobiscroll.util.datetime.formatDate('yy-mm-dd HH:ii:ss', new Date());
    user.createdAt = Date.now();

    console.log(user);

    const path = environment.apiURL + 'createOwner';
    console.log('Trying to Post');
    console.log(path);
    console.log(token);
    return fetch(path, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token }),
      body: JSON.stringify({
        email: user.email
        // password: user.password
      })
    })
      .then(res => {

        if (res.ok) {
          return res.json().then(resData => {
            console.log('response in dbCreateOwner is ' + resData.userId);
            return resData;
          });
        }
        else {

          return res.json().then(resData => {
            console.log('response in dbCreateOwner is ' + resData.error);
            return resData;
          });

        }

      })
      .catch(err => {
        console.log('error was ' + err);
      });


  }

  async updateProfile(user: Partial<User>, userId) {

    const collection = this.afs.collection('staff_users');

    let querySnapshot: firebase.firestore.QuerySnapshot = await this.afs.collection<any>('staff_users', ref => ref.where('email', '==', user.email)).get().pipe(take(1)).toPromise();

    if (querySnapshot && !querySnapshot.empty) {

      return querySnapshot.docs[0].ref;

    }
    else {

      let data = {
        email: user.email,
        name: user.name,
        arabicName: user.arabicName,
        emailVerified: false,
        phoneNumber: user.phoneNumber,
        uid: userId,
        createdBy: 'Super Admin',
        isRTL: true,
        createdAt: new Date() //mobiscroll.util.datetime.formatDate('yy-mm-dd HH:ii:ss', new Date())

      };

      return await collection.add(data);
      // return this.afs.collection('users').doc(userId).set(data);

    }

  }


  createOwnerStore(store: Partial<Store>, userId: string) {

    const collection = this.afs.collection('stores');

    let data = {
      name: store.name,
      arabicName: store.arabicName,
      busTypeId: store.busTypeId,
      ownerId: userId,
      countryId: store.countryId
    };

    return collection.add(data);

  }


  getRoleId(role) {

    const rolesCollection: AngularFirestoreCollection<any> = this.afs.collection<any>('roles', ref => ref.where('name', '==', role));

    return rolesCollection.snapshotChanges().pipe(take(1),map(actions => {

      return actions.map(action => {
        let data = action.payload.doc.data();
        let id = action.payload.doc.id;
        return { id, ...data };

      });
    }));
    // .subscribe(roles => {

    //     const usersCollection: AngularFirestoreCollection<any> = this.afs.collection<any>('users', ref => ref.where('uid', '==', userId));

    //     // this.afs.collection('users').doc(userId)
    //     usersCollection.snapshotChanges().map(actions => {

    //         return actions.map(action => {

    //             let data = action.payload.doc.data();
    //             let id = action.payload.doc.id;

    //             return { id, ...data };

    //         });
    //     })
    //         .subscribe(users => {

    //             let id = users[0]['id'];

    //             let ass: any[] = [];

    //             ass.push({
    //                 branchId: branchId,
    //                 roleId: roles[0]['id']
    //             });

    //             this.afs.collection('users').doc(id).update({ assignments: ass });


    //         });

    // });


  }


  async checkEmailExist(user: Partial<User>, storeId?: string) {

    let data = await this.afs.collection<any>('staff_users', ref => ref.where('email', '==', user.email)).valueChanges().pipe(take(1)).toPromise();

    if (data && data.length > 0) {

      if (storeId) {

        let data2 = await this.afs.collection<any>('branch_staff', ref => ref.where('user', '==', data[0].uid)).valueChanges().pipe(take(1)).toPromise();

        if (data2 && data2.length > 0) {      //No loop: we just check one branch as all branches of the staff have the same store (staff can not belong to more than one store)

          let data3: Partial<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> = await this.afs.collection<any>('branches').doc(data2[0].branch).get().pipe(take(1)).toPromise();

          if (data3.exists) {

            if (data3.data().storeId === storeId) {

              user.uid = data[0].uid;

              return false;

            }
            else {

              return true;

            }

          }

        }
        else {

          user.uid = data[0].uid;

          return false;

        }

      }
      else {

        return true;

      }

    }
    else {

      return false;

    }


  }


  checkIfAlreadyOwner(email: string) {

    let storeData: Partial<Store>;

    return this.afs.collection<any>('staff_users', ref => ref.where('email', '==', email)).valueChanges().pipe(take(1),map(async (data: User[]) => {

      if (data && data.length > 0) {

        let querySnapshot = await this.afs.collection<any>('stores', ref => ref.where('ownerId', '==', data[0].uid)).get().pipe(take(1)).toPromise();

        if (querySnapshot && !querySnapshot.empty) {

          storeData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };

          return {
            result: true,
            storeData: storeData
          };

        }
        else {

          return {
            result: false,
            storeId: null
          };
        }

      }
      else {

        return {
          result: false,
          storeId: null
        };

      }

    }));

  }


  checkPhoneNumberExist(phone: string) {

    return this.afs.collection<any>('staff_users', ref => ref.where('phoneNumber', '==', phone)).valueChanges().pipe(map((data: User[]) => {

      if (data.length > 0) {

        return true;

      }
      else {

        return false;

      }

    }));

  }


  getCurrentUser(email: string) {

    return this.afs.collection<any>('users', ref => ref.where('email', '==', email)).valueChanges().pipe(map((data: User[]) => {

      if (data.length > 0) {

        return data[0];

      }
      else {

        return null;

      }

    }));


  }



}
