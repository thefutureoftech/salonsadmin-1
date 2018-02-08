import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from './translate/translate.service';
import { Subscription } from 'rxjs/Subscription';
import { mobiscroll } from '@mobiscroll/angular'; import { NgForm } from '@angular/forms';
;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterViewInit {


  // iconNav = {
  //   lang: 'ar',
  //   theme: 'ios',
  //   type: 'top',
  //   display: 'inline'
  // };

  // gearMenu = {
  //   lang: 'ar',
  //   theme: 'ios',
  //   type: 'hamburger',
  //   menuIcon: 'line-settings'
  // };

  // birthday: Date;

  // setText: string;

  // demoSettings: any = {
  //   theme: 'ios',
  //   display: 'bottom'
  // };

  // public myFormInst: any;

  // public translatedText: string;
  // public supportedLanguages: any[];
  // public customer = {
  //   firstname: null,
  //   lastname: null
  // };
  // langSubs: Subscription;

  // @ViewChild('myVariable')
  // myRef: any;



  // constructor(private _translate: TranslateService) {
  //   this.customer.firstname = 'صلاح';
  //   this.customer.lastname = 'الهدابي';
  // }

  // init(event) {
  //   console.log(event.inst);
  //   // event.inst.settings.rtl = true;
  //   // this.myFormInst.settings.lang = 'ar';

  // }

  // ngOnInit() {
  //   // standing data
  //   this.supportedLanguages = [
  //     { display: 'English', value: 'en' },
  //     { display: 'Arabic', value: 'ar' },
  //   ];

  //   // set current langage
  //   this.selectLang('ar');

  // }

  ngAfterViewInit() {

    // let myText = this._translate.instant('select');

    //         this.myRef.instance.option({
    //           setText: myText
    //       });
    // console.log(this.myFormInst.settings.lang);
    // this.myFormInst.settings.lang = 'ar';

  }

  // isCurrentLang(lang: string) {
  //   // check if the selected lang is current lang
  //   return lang === this._translate.currentLang;
  // }

  // selectLang(lang: string) {
  //   // set current lang;
  //   this._translate.use(lang);
  //   // this.refreshText();
  // }

  // refreshText() {
  //   // refresh translation when language change
  //   this.translatedText = this._translate.instant('hello world');
  // }

  // subscribeToLangChanged() {

  //   this.langSubs = this._translate.onLangChanged.subscribe(x => this.refreshText());
  // }

  ngOnDestroy() {
    // this.langSubs.unsubscribe();
  }

}
