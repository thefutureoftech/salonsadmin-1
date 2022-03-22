import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../translate/translate.service';
import { LANG_AR_TRANS } from '../../translate/lang-ar';
import * as langs_trans from '../../translate/langs.trans';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { UserDBService } from '../../services/user.dbservice';
import { User } from '../../model/user';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';
import { CREATE_BUSINESS_TYPE, SELECT_BUSINESS_TYPE } from '../../translate/langs.trans';
import { MbscSelectOptions } from '@mobiscroll/angular';
import { mobiscroll } from '@mobiscroll/angular';
import { Store } from '../../model/store';
import { CrossService } from '../../services/cross.service';
import { StoreDBService } from '../../services/store.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-ownerdetails',
  templateUrl: './ownerdetails.component.html',
  styleUrls: ['./ownerdetails.component.css']
})
export class OwnerdetailsComponent implements OnInit, OnDestroy {

  itemSelected: boolean;
  user: Partial<User>;

  isOwnerStaff: boolean = true;

  public translatedText: string;
  public supportedLanguages: any[];
  public ownerCreatedText: string;
  public continueToCreateText: string;
  public selectBusinessTypeText: string;
  public busNameText: string;

  formSettings = {
    theme: 'ios'
  };

  selectOptions: MbscSelectOptions = {
    theme: 'material',
    headerText: 'Select',
    onSet: (event, inst) => {

      if (!event.valueText) {

        this.itemSelected = false;

        return;

      }

      if (event.valueText.length == 0) {

        this.itemSelected = false;

      }
      else {

        this.itemSelected = true;

      }

    }

  };

  myForm2: FormGroup;
  private myForm: NgForm;
  private formClearSub: Subscription;
  private emailExistSub: Subscription;


  // busTypeData = [{ text: this.selectBusinessTypeText, value: '0' }, { text: 'salons', value: '1' }];

  numpad: number;


  nameText: string;
  emailText: string;
  passwordText: string;
  phoneText: string;
  createOwnerAccountText: string;
  spinning: boolean;

  langSubs: Subscription;


  constructor(private _translate: TranslateService, private userdbService: UserDBService,
    private crossService: CrossService, private storedbService: StoreDBService,
    private router: Router,
    private activeRoute: ActivatedRoute, private userService: UserService) {

  }


  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

    this.formClearSub = this.crossService.subToFormClearance().subscribe((flag: boolean) => {
      console.log('Inside subcription to form clearance');
      console.log(flag);
      if (flag) {
        if (this.myForm) {
          console.log('clearing form');
          this.myForm.reset();
          this.ownerCreatedText = null;

        }

      }
    });

    this._translate.use('en')

    this.continueToCreateText = this._translate.instant(langs_trans.CONT_OWNER_CREATE);
    this.emailText = this._translate.instant(langs_trans.EMAIL_TEXT);
    this.nameText = this._translate.instant(langs_trans.NAME_TEXT);
    this.passwordText = this._translate.instant(langs_trans.PASSWORD_TEXT);
    this.phoneText = this._translate.instant(langs_trans.PHONE_TEXT);
    this.createOwnerAccountText = this._translate.instant(langs_trans.CREATE_OWNER_ACCOUNT_LBL);
    this.selectBusinessTypeText = this._translate.instant(langs_trans.SELECT_BUSINESS_TYPE);
    this.busNameText = this._translate.instant(langs_trans.SELECT_BUSINESS_NAME);


    this.ownerCreatedText = null;

    this.initForm();

  }


  initForm() {

    this.user = this.userService.getOwner();

    if (!this.user) {

      this.user = new User(true);

    }
    // mobiscroll.util.datetime.formatDate('yy-mm-dd HH:ii:ss', new Date());
    this.user.createdAt = Date.now();

    if (this.userService.isOwnerStaff()) {

      this.isOwnerStaff = true;

    }
console.log('loaded owner details');

  }

  proceed(form: NgForm) {

    this.emailExistSub = this.userdbService.checkIfAlreadyOwner(this.user.email).subscribe(async exists => {

      let result = await exists

      if (result && result.result) {

        mobiscroll.alert({
          title: 'Already an Owner',
          message: 'Email ' + this.user.email + ' already exists as an Owner'
        });

      }
      else {

        this.userService.setOwner(this.user);

        this.userService.setOwnerAsSatff(this.isOwnerStaff);

        this.router.navigate(['businessDetails']);

      }

    });


  }


  // createOwner(form: NgForm) {

  //   this.myForm = form;

  //   let user: User = new User(true, 'Super Admin');

  //   user.name = form.value.name;
  //   user.email = form.value.email;
  //   user.phoneNumber = form.value.phone;
  //   user.password = form.value.password;
  //   user.phoneNumber = form.value.numpad;
  //   user.emailVerified = false;

  //   this.spinning = true;

  //   this.userdbService.createUser(user)
  //     .then(

  //     response => {

  //       if (response['error']) {
  //         this.spinning = false;
  //         mobiscroll.alert({
  //           title: 'Error',
  //           message: response.error
  //         });
  //         return;
  //       }

  //       console.log("Response from creating user is " + response.userId);
  //       this.userdbService.updateProfile(user, response.userId)
  //         .then((docRef: DocumentReference) => {
  //           docRef.get().then((docSnapshot: DocumentSnapshot) => {
  //             console.log(docSnapshot.data().uid);
  //             console.log('Selected business is ' + this.busTypeData[form.value.busType].text);
  //             this.storedbService.getbusinessTypes(this.busTypeData[form.value.busType].text)
  //               .subscribe(businessTypes => {
  //                 let store = new Store();
  //                 store.name = form.value.busName;
  //                 store.busTypeId = businessTypes[0]['id'];
  //                 this.userdbService.createOwnerStore(store, docSnapshot.data().uid)
  //                   .then((docRef: DocumentReference) => {
  //                     docRef.get().then((docSnapshot2: DocumentSnapshot) => {
  //                       this.userdbService.craeteUserStoreDetails(docSnapshot.data().uid, docSnapshot2.id);
  //                       this.spinning = false;
  //                       this.ownerCreatedText = docSnapshot.data().name + ' Created!';
  //                       mobiscroll.toast({
  //                         message: this.ownerCreatedText
  //                       });
  //                     })
  //                       .catch((error) => {

  //                       });
  //                   });

  //               });

  //           })
  //             .catch((error) => {

  //               this.ownerCreatedText = null;
  //             });

  //         },

  //         error => {

  //           console.log(error);
  //         }
  //         );

  //     })
  // }


  ngOnDestroy() {

    console.log('destroyed owner details');
    this.formClearSub.unsubscribe();

    if (this.emailExistSub) {

      this.emailExistSub.unsubscribe();

    }


  }



}
