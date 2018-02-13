import { mobiscroll } from '@mobiscroll/angular/dist/js/mobiscroll.angular.min.js';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../translate/translate.service';
import { Subscription } from 'rxjs/Subscription';
<<<<<<< HEAD
import { LANG_AR_TRANS } from '../../translate/lang-ar';
import * as langs_trans from '../../translate/langs.trans';
import { Router, ActivatedRoute } from '@angular/router';
=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconNav = {
    lang: 'ar',
    theme: 'ios',
    type: 'top',
    display: 'inline'
  };

  gearMenu = {
    lang: 'ar',
    theme: 'ios',
    type: 'hamburger',
    menuIcon: 'line-settings'
  };

  iconMenu = {
    lang: 'ar',
    theme: 'ios',
    type: 'hamburger'
  };

  public translatedText: string;
  public supportedLanguages: any[];
  langSubs: Subscription;
<<<<<<< HEAD

  salonAdminTitle: string;
  createStoreOwnerText: string;
  createCountryText: string;
  createStatesText: string;
  createCitiesText: string;
  createTownsText: string;
  createBlocksText: string;

  showHambMenu: boolean = false;


  constructor(private _translate: TranslateService, private router: Router, 
              private activeRoute: ActivatedRoute) { }
=======
  

  constructor(private _translate: TranslateService) { }
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

<<<<<<< HEAD
    this._translate.use('en');

    this.salonAdminTitle = this._translate.instant(langs_trans.SALON_ADMIN);
    this.createStoreOwnerText = this._translate.instant(langs_trans.CREATE_STORE_OWNER);
    this.createCountryText = this._translate.instant(langs_trans.CREATE_COUNTRY_TEXT);
    this.createStatesText = this._translate.instant(langs_trans.CREATE_STATES_LBL);
    this.createCitiesText = this._translate.instant(langs_trans.CREATE_CITIES_LBL);
    this.createTownsText = this._translate.instant(langs_trans.CREATE_TOWNS_LBL);
    this.createBlocksText = this._translate.instant(langs_trans.CREATE_BLOCK_LBL);

  }


  navItemTapped(event){

    if(event.target.id == 'createOwner'){

      this.router.navigate(['owner'], {relativeTo: this.activeRoute});

    }

  }

  // isCurrentLang(lang: string) {
  //   return lang === this._translate.currentLang;
  // }

  // selectLang(lang: string) {
  //   this._translate.use(lang);
  // }

  // refreshText() {
  //   this.translatedText = this._translate.instant('hello world');
  // }

  // subscribeToLangChanged() {

  //   this.langSubs = this._translate.onLangChanged.subscribe(x => this.refreshText());
  // }

  // ngOnDestroy() {
  //   this.langSubs.unsubscribe();
  // }
=======
    this.selectLang('ar');

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
