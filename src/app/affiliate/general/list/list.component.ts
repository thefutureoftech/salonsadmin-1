import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MbscListview } from '@mobiscroll/angular';
import { Subscription } from 'rxjs';
import { AffiliateService } from '../../../services/affiliate.service';
import { AffiliatedUser } from '../../../model/affiliatedUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild('myList')
  myList: MbscListview;

  formSettings: any;

  data: Partial<AffiliatedUser>[];

  listType: string;

  routeSubscription: Subscription;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private affiliateService: AffiliateService, private ngZone: NgZone) { }

  ngOnInit(): void {


    this.routeSubscription = this.activeRoute.data.subscribe(routeData => {

      console.log(routeData);

      this.listType = routeData['data'][0].type;

      console.log('list type is ' + this.listType);

      this.data = routeData['data'][1];

      console.log('affilates are');

      console.log(this.data);

      this.setListView();

    });

    this.formSettings = {
      theme: 'ios',
      lang: 'en',
      inputStyle: 'outline',
      labelStyle: 'stacked'
    };


  }


  setListView() {

    setTimeout(() => {

      console.log(this.myList);

      if (this.myList && this.myList.instance) {

        if (this.listType === 'members') {

          console.log('setting members list');

          this.myList.instance.option({
            theme: 'ios',
            sortable: true,
            iconSlide: true,
            swipe: true,
            striped: true,
            stages: [{
              percent: -50,
              color: 'red',
              icon: 'sad',
              text: 'Deactivate',
              confirm: true,
              action: (event, inst) => {
                this.setUserActive(event.index, false);
              }
            }, {
              percent: 50,
              color: 'green',
              icon: 'happy',
              text: 'Activate',
              confirm: true,
              action: (event, inst) => {
                this.setUserActive(event.index, true);
              }
            }]
          });

        }
        else {

          this.myList.instance.option({
            theme: 'ios',
            sortable: true,
            iconSlide: false,
            swipe: false,
            striped: true,
          });

        }

      }

    });

  }


  navItemTapped(event) {

    this.router.navigate(['../../addaffiliate'], { relativeTo: this.activeRoute });

  }



  async setUserActive(index: number, activate: boolean) {

    //save to DB
    await this.affiliateService.toggleAffiliate(this.data[index].userId, activate);

    this.ngZone.run(() => {

      this.data[index].active = activate;

    });

  }


  editAffiliate(event) {

    this.router.navigate(['../../editaffiliate', event.target.dataset.id, this.listType], { relativeTo: this.activeRoute });

  }


  ngOnDestroy() {

    if (this.routeSubscription) {

      this.routeSubscription.unsubscribe();

    }

  }


}
