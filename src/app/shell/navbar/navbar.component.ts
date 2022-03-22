import { mobiscroll } from '@mobiscroll/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '../../translate/translate.service';
import { Subscription } from 'rxjs';
import { LANG_AR_TRANS } from '../../translate/lang-ar';
import * as langs_trans from '../../translate/langs.trans';
import { Router, ActivatedRoute } from '@angular/router';
import { CrossService } from '../../services/cross.service';
import { AuthService } from '../../services/auth.service';
import { tap, map, take } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @BlockUI()
  blockUI: NgBlockUI;

  formSettings = {

    theme: 'ios',
    lang: 'en'

  }

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

  salonAdminTitle: string;
  createStoreOwnerText: string;
  createCountryText: string;
  createStatesText: string;
  createCitiesText: string;
  createTownsText: string;
  createBlocksText: string;
  createBusinessTypeText: string;

  showHambMenu: boolean = false;

  showNavigation: boolean;
  userAuthSub: Subscription;

  username: string;


  constructor(private _translate: TranslateService, private router: Router,
    private activeRoute: ActivatedRoute,
    private crossService: CrossService,
    private auth: AuthService) { }


  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

    this._translate.use('en');

    this.salonAdminTitle = this._translate.instant(langs_trans.SALON_ADMIN);
    this.createStoreOwnerText = this._translate.instant(langs_trans.CREATE_STORE_OWNER);
    this.createCountryText = this._translate.instant(langs_trans.CREATE_COUNTRY_TEXT);
    this.createStatesText = this._translate.instant(langs_trans.CREATE_STATES_LBL);
    this.createCitiesText = this._translate.instant(langs_trans.CREATE_CITIES_LBL);
    this.createTownsText = this._translate.instant(langs_trans.CREATE_TOWNS_LBL);
    this.createBlocksText = this._translate.instant(langs_trans.CREATE_BLOCK_LBL);
    this.createBusinessTypeText = this._translate.instant(langs_trans.CREATE_BUSINESS_TYPE);


    this.userAuthSub = this.auth.user$.pipe(
      map(user => { console.log(user); if (user && user.superAdmin) { return true } else { return false } }),
      tap(isAdmin => {

        console.log('user admin is ' + isAdmin);

        if (!isAdmin) {
          return false;
        }
        else {
          return true;
        }
      })
    ).subscribe(isAdmin => {

      if (isAdmin) {

        this.showNavigation = true;

        this.auth.getLoggedInUserName().pipe(take(1)).subscribe(user => {

          this.username = user.name;

        });

      }
      else {

        this.showNavigation = false;
      }

    });


  }


  navItemTapped(event) {


    if (event.target.innerText == 'New Store') {

      this.router.navigate(['owner'], { relativeTo: this.activeRoute }).then(result => { console.log(result); })
      this.crossService.sendFormClearFlag(true);

    }
    else if (event.target.innerText == 'New Branch'){

      this.router.navigate(['owner/ownersearch'], { relativeTo: this.activeRoute }).then(result => { console.log(result); })
      this.crossService.sendFormClearFlag(true);

    }
    else if (event.target.innerText == 'Places') {
      this.router.navigate(['admin']);
    }
    else if (event.target.innerText == 'Services') {
      this.router.navigate(['admin/services']);
    }
    else if (event.target.innerText == 'Affiliate') {
      this.router.navigate(['affiliate']);
    }
    else if (event.target.innerText == 'Subscriptions') {
      this.router.navigate(['subscription']);
    }


  }

  goHome() {

    this.router.navigate(['home']);

  }


  logout() {

    this.auth.signOut().then(() => {

      this.router.navigate(['login']);

    });

  }


  ngOnDestroy() {

    this.userAuthSub.unsubscribe();

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

}
