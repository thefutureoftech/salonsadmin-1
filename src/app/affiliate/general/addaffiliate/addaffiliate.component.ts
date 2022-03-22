import { Component, NgZone, OnInit } from '@angular/core';
import { MbscFormOptions } from '@mobiscroll/angular';
import { User } from '../../../model/user';
import { AffiliateService } from '../../../services/affiliate.service';

@Component({
  selector: 'app-addaffiliate',
  templateUrl: './addaffiliate.component.html',
  styleUrls: ['./addaffiliate.component.css']
})
export class AddaffiliateComponent implements OnInit {

  startSearch: boolean;

  showResult: boolean;

  user: Partial<User>;

  startMaking: boolean;

  formSettings: MbscFormOptions = {
    theme: 'ios',
    inputStyle: 'outline',
    labelStyle: 'stacked'
  };

  constructor(private affiliateService: AffiliateService, private ngZone: NgZone) { }

  ngOnInit(): void {
  }


  async search(event) {

    this.startSearch = true;

    this.user = null;

    if ((<string>event.target.value).trim() === '' || (<string>event.target.value).length != 8) {

      this.startSearch = false;

      this.showResult = false;

      return;

    }

    this.user = await this.affiliateService.getUserByPhoneNumber(event.target.value);

    this.ngZone.run(() => {

      this.startSearch = false;

      if (this.user) {

        this.showResult = true;

      }
      else {

        this.showResult = false;

      }

    });


  }


  async makeAffiliate(userId: string, toggleAffiliate: boolean) {

    this.startMaking = true;

    await this.affiliateService.toggleAffiliate(userId, toggleAffiliate);

    this.ngZone.run(() => {

      this.startMaking = false;

    });

  }


}
