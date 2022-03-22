import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  formSettings: any;

  tabSettings: any

  currentTab: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentTab = 'requests';

    this.formSettings = {
      theme: 'ios',
      lang: 'en',
      inputStyle: 'outline',
      labelStyle: 'stacked'
    };



    this.tabSettings = {
      theme: 'ios',
      lang: 'en',
      display: 'inline'
    };


    if (this.currentTab == 'requests') {

      this.router.navigate(['./list/requests'], { relativeTo: this.activeRoute, queryParamsHandling: "merge" });

    }


  }


  goToTab(tabName) {

    this.currentTab = tabName;

  }



}
