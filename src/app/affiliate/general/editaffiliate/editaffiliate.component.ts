import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AffiliateService } from '../../../services/affiliate.service';
import { AffiliatedUser } from '../../../model/affiliatedUser';

@Component({
  selector: 'app-editaffiliate',
  templateUrl: './editaffiliate.component.html',
  styleUrls: ['./editaffiliate.component.css']
})
export class EditaffiliateComponent implements OnInit {

  formSettings: any;

  routeSubscription: Subscription;

  data: Partial<AffiliatedUser>[];

  listType: string;

  activeMember: boolean;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private affiliateService: AffiliateService, private ngZone: NgZone) { }

  ngOnInit(): void {


    this.routeSubscription = this.activeRoute.data.subscribe(routeData => {

      this.listType = routeData['data'][0].type;

      this.data = routeData['data'][1];

      this.activeMember = this.data[0].active;

      console.log(this.listType);

      console.log(this.data);

    });

    this.formSettings = {
      theme: 'ios',
      lang: 'en',
      inputStyle: 'outline',
      labelStyle: 'stacked'
    };

  }


  toggleActive() {


    console.log('toggling active');
    this.activeMember = !this.activeMember;

  }


  async transferMoney() {

    await this.affiliateService.transferMoneyToAffiliate(this.data[0], this.listType);

    this.ngZone.run(() => {

      this.router.navigate(['../../../list', this.listType], { relativeTo: this.activeRoute });

    });

  }


  async saveAffiliate() {

    console.log(this.activeMember);

    this.data[0].active = this.activeMember;

    await this.affiliateService.saveAffiliate(this.data[0], this.listType);

    this.ngZone.run(() => {

      this.router.navigate(['../../../list', this.listType], { relativeTo: this.activeRoute });

    });

  }



}
