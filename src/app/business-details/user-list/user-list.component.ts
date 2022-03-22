import { Component, OnInit } from '@angular/core';
import { mobiscroll } from '@mobiscroll/angular';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDBService } from '../../services/user.dbservice';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  formSettings = {
    theme: 'ios'
  };

  activateTab: boolean = false;

  data: Partial<User>[];

  storeId: string;

  listviewSettings: any = {
    theme: 'ios',
    sortable: true,
    iconSlide: true,
    striped: true,
    stages: [{
      percent: -50,
      color: 'red',
      icon: 'remove',
      text: 'Delete',
      confirm: true,
      action: (event, inst) => {
        this.data.splice(event.index, 1);
        this.userService.setStaff(<any>this.data);
        return false;
      }
    }, {
      percent: 50,
      color: 'green',
      icon: 'line-user',
      text: 'Edit',
      confirm: true,
      action: (event, inst) => {
        this.activateTab = true;
        this.router.navigate(['employee'], { relativeTo: this.activeRoute, queryParams: { index: event.index, storeId: this.storeId } });
      }
    }]
  }

  constructor(private router: Router, private activeRoute: ActivatedRoute, private userService: UserService,
    private userDBService: UserDBService) { }

  ngOnInit() {

    this.storeId = this.activeRoute.snapshot.queryParams.storeId;

    this.data = this.userService.getStaff();

    this.activeRoute.queryParams.subscribe(params => {

      if (params.close) {
        this.data = this.userService.getStaff();
        this.closeDetails();
      }

    });


  }


  navItemTapped(event) {

    this.activateTab = true;
    this.router.navigate(['employee'], { relativeTo: this.activeRoute, queryParams: { index: -1, storeId: this.storeId } });

  }


  closeDetails() {

    this.activateTab = false;

  }

  showConfirm() {
    mobiscroll.confirm({
      title: 'Create Store?',
      message: 'You are about to perform a new store setup operation!!',
      okText: 'Yes',
      cancelText: 'No',
      callback: (res) => {

        if (res) {

          this.proceed();

        }
      }
    });
  }

  goBack() {

    this.router.navigate(['../hours'], { relativeTo: this.activeRoute, queryParams: { storeId: this.storeId } });

  }

  async proceed() {

    let stopProcessing: boolean = false;

    //we added this check to prevent adding existing staff to a new store with a new sponsor

    for (let user of this.data) {

      let result = await this.userDBService.checkEmailExist(user, this.storeId);

      if (result) {

        mobiscroll.alert({
          title: 'Email Exists',
          message: 'Email ' + user.email + ' already exist as a staff (new store) or belong to another sponsor (new branch)'
        });

        stopProcessing = true;

        break;

      }

    }

    if (!stopProcessing) {

      this.router.navigate(['../final'], { relativeTo: this.activeRoute, queryParams: {storeId: this.storeId} });

    }


  }


}
