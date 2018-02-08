import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '../../translate/translate.service';

@Component({
  selector: 'app-ownerdetails',
  templateUrl: './ownerdetails.component.html',
  styleUrls: ['./ownerdetails.component.css']
})
export class OwnerdetailsComponent implements OnInit {


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

  nameText: string;
  emailText: string;
  passwordText: string;
  phoneText: string;


  public translatedText: string;
  public supportedLanguages: any[];
  langSubs: Subscription;
  

  constructor(private _translate: TranslateService) { }

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

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


}
