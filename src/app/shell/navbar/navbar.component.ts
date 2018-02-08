import { mobiscroll } from '@mobiscroll/angular/dist/js/mobiscroll.angular.min.js';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../translate/translate.service';
import { Subscription } from 'rxjs/Subscription';


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
  

  constructor(private _translate: TranslateService) { }

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Arabic', value: 'ar' },
    ];

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

}
