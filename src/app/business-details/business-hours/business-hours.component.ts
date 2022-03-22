import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Hours } from '../../model/hours';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.css']
})
export class BusinessHoursComponent implements OnInit {


  days: Partial<Hours>[];

  storeId: string;

  formSettings = {
    theme: 'ios'
  };

  h12Settings: any = {
    theme: 'ios',
    display: 'bottom',
    timeFormat: 'hh:ii A'
  };

  fixedSettings: any = {
    theme: 'ios',
    layout: 'fixed',
    itemWidth: 80
  };

  pagingSettings: any = {
    theme: 'ios',
    layout: 3,
    paging: true
  }


  @ViewChild('fromTime')
  myRef: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit() {

    this.storeId = this.activeRoute.snapshot.queryParams.storeId;

    this.days = this.storeService.getBranch().schedule;

    for (let day of this.days) {

      day.fromTime.setHours(9);

      day.fromTime.setMinutes(0);

      day.toTime.setHours(12);

      day.toTime.setMinutes(0);

      day.fromTime2.setHours(13);

      day.fromTime2.setMinutes(0);

      day.toTime2.setHours(21);

      day.toTime2.setMinutes(0);

    }


  }


  goBack() {

    this.router.navigate(['../'], { relativeTo: this.activeRoute, queryParams: { storeId: this.storeId } });

  }

  checkClicked(index) {

    if (this.days[index]) {

    }
    else {

    }


  }

  checkboxChange(event) {



  }


  proceed(form: NgForm) {

    // this.router.navigate(['../services'], {relativeTo: this.activeRoute});

    this.router.navigate(['../employees'], { relativeTo: this.activeRoute, queryParams: { storeId: this.storeId } });

  }



}
