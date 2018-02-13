import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '../../translate/translate.service';
import { LANG_AR_TRANS } from '../../translate/lang-ar';
import * as langs_trans from '../../translate/langs.trans';
import { NgForm } from '@angular/forms';
import { UserDBService } from '../../services/user.dbservice';
import { User } from '../../model/user';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';


@Component({
  selector: 'app-ownerdetails',
  templateUrl: './ownerdetails.component.html',
  styleUrls: ['./ownerdetails.component.css']
})
export class OwnerdetailsComponent implements OnInit {


  formSettings = {
    theme: 'ios'
  };


  public translatedText: string;
  public supportedLanguages: any[];
  public ownerCreatedText: string;

  continueToCreateText: string;
  nameText: string;
  emailText: string;
  passwordText: string;
  phoneText: string;
  createOwnerAccountText: string;
  spinning: boolean;


  constructor(private _translate: TranslateService, private userdbService: UserDBService) { }

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

    this._translate.use('en')

    this.continueToCreateText = this._translate.instant(langs_trans.CONT_OWNER_CREATE);
    this.emailText = this._translate.instant(langs_trans.EMAIL_TEXT);
    this.nameText = this._translate.instant(langs_trans.NAME_TEXT);
    this.passwordText = this._translate.instant(langs_trans.PASSWORD_TEXT);
    this.phoneText = this._translate.instant(langs_trans.PHONE_TEXT);
    this.createOwnerAccountText = this._translate.instant(langs_trans.CREATE_OWNER_ACCOUNT_LBL);

    this.ownerCreatedText = null;

  }


  createOwner(form: NgForm) {

    let user: User = new User(true, 'Super Admin');

    user.name = form.value.name;
    user.email = form.value.email;
    user.phoneNumber = form.value.phone;
    user.password = form.value.password;
    user.phoneNumber = form.value.numpad;
    user.emailVerified = false;

    this.spinning = true;

    this.userdbService.createUser(user)
      .then((docRef: DocumentReference) => {
        docRef.get().then((docSnapshot: DocumentSnapshot) => {
          this.spinning = false;
          this.ownerCreatedText = docSnapshot.data().name + ' Created!';
        });
      })
      .catch((error) => {
        this.ownerCreatedText = null;
      });

  }



}
