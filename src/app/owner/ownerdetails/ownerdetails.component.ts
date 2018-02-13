import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '../../translate/translate.service';
<<<<<<< HEAD
import { LANG_AR_TRANS } from '../../translate/lang-ar';
import * as langs_trans from '../../translate/langs.trans';
import { NgForm } from '@angular/forms';
import { UserDBService } from '../../services/user.dbservice';
import { User } from '../../model/user';
import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';

=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588

@Component({
  selector: 'app-ownerdetails',
  templateUrl: './ownerdetails.component.html',
  styleUrls: ['./ownerdetails.component.css']
})
export class OwnerdetailsComponent implements OnInit {


<<<<<<< HEAD
  formSettings = {
    theme: 'ios'
  };


  public translatedText: string;
  public supportedLanguages: any[];
  public ownerCreatedText: string;

  continueToCreateText: string;
=======
  numpad: number;

  numpadSettings: any = {
    theme: 'ios',
    display: 'bottom',
    cssClass: 'md-phone-num',
    template: '{plus}ddddddddddd',
    maxLength: 14,
    allowLeadingZero: true,
    leftKey: {
      text: '+',
      value: '',
      variable: 'plus:+'
    },
    formatValue: function (numbers, vars, inst) {
      var newVal = ' ';

      if (vars.plus) {
        newVal += vars.plus;
      }

      newVal += numbers.join().replace(/,/g, '');

      return newVal;
    },
    parseValue: function (value) {
      if (value) {
        return value.toString().split('');
      }
      return [];
    },
    validate: function (event, inst) {
      var disabled = [],
        invalid = false;

      if (inst.isVisible()) {
        inst._markup[0].querySelector('.mbsc-np-dsp').innerHTML = inst.settings.formatValue(event.values, event.variables, inst) || '&nbsp;'
      }

      return {
        invalid: invalid,
        disabled: disabled
      };
    }
  };

  formSettings = {
    lang: 'ar',
    theme: 'ios'
  };

>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
  nameText: string;
  emailText: string;
  passwordText: string;
  phoneText: string;
<<<<<<< HEAD
  createOwnerAccountText: string;
  spinning: boolean;


  constructor(private _translate: TranslateService, private userdbService: UserDBService) { }
=======


  public translatedText: string;
  public supportedLanguages: any[];
  langSubs: Subscription;
  

  constructor(private _translate: TranslateService) { }
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

<<<<<<< HEAD
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

=======
    this.selectLang('ar');

    this.nameText = this._translate.instant('nameText');
    this.emailText = this._translate.instant('emailText');
    this.passwordText = this._translate.instant('passwordText');
    this.phoneText = this._translate.instant('phoneText');

  }

    isCurrentLang(lang: string) {
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    this._translate.use(lang);
  }

  refreshText() {
    this.translatedText = this._translate.instant('hello world');
  }

  subscribeToLangChanged() {

    this.langSubs = this._translate.onLangChanged.subscribe(x => this.refreshText());
  }

  ngOnDestroy() {
    this.langSubs.unsubscribe();
  }
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588


}
