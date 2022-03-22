import { Component, OnInit } from '@angular/core';
import { mobiscroll } from '@mobiscroll/angular';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import { CrossService } from '../../services/cross.service';
import { StoreService } from '../../services/store.service';
import { UserService } from '../../services/user.service';
import { StoreDBService } from '../../services/store.dbservice';
import { User } from '../../model/user';
import { UserDBService } from '../../services/user.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Branch } from '../../model/branch';
import { Store } from '../../model/store';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {


  @BlockUI() blockUI: NgBlockUI;

  owner: User;

  spinning: boolean;

  formSettings = {
    theme: 'ios'
  };

  userCreated: boolean = false;

  storeId: string;

  constructor(private crossService: CrossService,
    private storeService: StoreService,
    private userService: UserService,
    private storeDBService: StoreDBService,
    private userDBService: UserDBService,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {

    if (this.activeRoute.snapshot.queryParams.storeId) {

      this.storeId = this.activeRoute.snapshot.queryParams.storeId;

    }

    this.authService.getAuthToken().then(authToken => {

      if (this.storeId) {

        this.spinning = true;

        this.blockUI.start('Processing...');

        this.createBranch(authToken);

      }
      else {

        this.createOwner(authToken);

      }

    });


  }


  createOwner(token: string) {

    this.spinning = true;

    this.blockUI.start('Processing...');

    this.owner = this.userService.getOwner();

    this.userDBService.createUser(this.owner, token)
      .then(

        response => {

          console.log(response);

          if (response && response['error'] && response['error'] !== 'The email address is already in use by another account.') {
            this.spinning = false;
            this.blockUI.stop();
            mobiscroll.alert({
              title: 'Error',
              message: response.error
            });
            return;
          }

          console.log("Response from creating user is " + response.userId);
          this.userDBService.updateProfile(this.owner, response.userId)
            .then((docRef: DocumentReference) => {
              docRef.get().then((docSnapshot: DocumentSnapshot) => {
                let owner2 = this.userService.getOwner();
                owner2.user = docSnapshot.data().uid;
                this.userService.setOwner(owner2);
                // this.storeDBService.getbusinessTypes(this.storeService.getStore().busTypeId)
                this.userDBService.createOwnerStore(this.storeService.getStore(), docSnapshot.data().uid)
                  .then((docRef: DocumentReference) => {
                    docRef.get().then((docSnapshot2: DocumentSnapshot) => {
                      this.storeId = docSnapshot2.id;
                      this.storeDBService.saveLogo(this.storeService.getStore().logo, docSnapshot2.id, this.createBranch.bind(this, token));
                      // .then((docRef: DocumentReference) => {
                      //   docRef.get().then((docSnapshot2: DocumentSnapshot) => {
                      //     let branch = this.storeService.getBranch();
                      //     branch.id = docSnapshot2.id;
                      //     this.storeService.setBranch(branch);
                      //     this.userDBService.updateBranchAssignments(docSnapshot.data().uid, docSnapshot2.id);
                      //     this.spinning = false;
                      //     mobiscroll.toast({
                      //       message: 'User was created'
                      //     });
                      //     this.userCreated = true;
                      //   });
                      // });
                    })
                      .catch((error) => {

                      });
                  });

                // });

              })
                .catch((error) => {

                  console.log('Error from updating profile :' + error);
                });

            },

              error => {

                console.log(error);
              }
            );

        });

  }


  createBranch(token: string) {

    console.log('this.storeService.getBranch().storeLogoURL is ' + this.storeService.getBranch().storeLogoURL);

    this.storeService.getBranch().address.countryId = this.storeService.getStore().countryId;

    this.storeDBService.createStoreBranch(this.storeId, this.storeService.getBranch(),
      (this.userService.getStaff()), this.crossService.getServiceData(), this.doneCallBack.bind(this), token);

  }


  doneCallBack() {
    console.log(this.userService.isOwnerStaff());
    if (this.userService.isOwnerStaff()) {

      this.storeDBService.updateUserBranchRole('staff', this.userService.getOwner().email, this.storeService.getBranch().id, this.doneCallBack2.bind(this));

    }
    else {

      this.spinning = false;

      this.blockUI.stop();

    }

    // this.storeDBService.saveLocation(this.storeService.getBranch().id);


  }

  doneCallBack2() {
    console.log('stopped loader');
    this.spinning = false;
    this.blockUI.stop();

  }


  clearData() {

    this.storeService.setBranch(new Branch());

    this.storeService.setStore(new Store());

    this.userService.setOwner(null);

    this.router.navigate(['home']);

  }


  // updateUserAssignments() {

  //   console.log('Branch id is ' + this.storeService.getBranch().id);
  //   console.log('User id is ' + this.userService.getOwner().uid);
  //   this.userDBService.updateBranchAssignments(this.userService.getOwner().uid, this.storeService.getBranch().id);

  //   this.userCreated = false;

  // }

}
