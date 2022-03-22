import { Component, OnInit } from '@angular/core';
import { MbscCardOptions, MbscFormOptions } from '@mobiscroll/angular';
import { AffiliateService } from '../../../services/affiliate.service';
import { AffiliateDashboard } from '../../../model/affiliateDashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formSettings: MbscFormOptions = {
    theme: 'ios',
    inputStyle: 'outline',
    labelStyle: 'stacked'
  };

  cardSettings: MbscCardOptions = {
    lang: 'en',
    theme: 'ios'
  };

  startSearch: boolean;

  dashbaord: Partial<AffiliateDashboard>;

  constructor(private affiliateService: AffiliateService) { }

  ngOnInit(): void {



  }


  async getDashboardData() {

    this.startSearch = true;

    this.dashbaord = await this.affiliateService.getAffiliatedDashboard();

    this.startSearch = false;

  }

}
