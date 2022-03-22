import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: Partial<User>;

  tempUser: Partial<User>;

  newMode: boolean;

  index: number;

  formSettings = {
    theme: 'ios'
  };

  storeId: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(params => {

      if (params.index >= 0) {

        this.newMode = false;

        this.index = params.index;

        this.storeId = params.storeId;

      }
      else {

        this.newMode = true;

      }

    });

    if(this.newMode){

      this.user = new User(true);

    }
    else{

      this.user = this.userService.getSelectedStaff(this.index);

      this.tempUser = {...this.user};

    }


  }

  proceed(form: NgForm) {

    if(this.newMode){

      this.userService.addStaff(<any>this.user);

    }
    else{

      this.userService.setSelectedStaff(<any>this.user, this.index);

    }

    this.router.navigate(['..'], { relativeTo: this.activeRoute, queryParams: { close: true, storeId: this.storeId } });

  }


  cancel() {

    this.user = {...this.tempUser};

    this.goBack();

  }

  goBack() {

    this.userService.setSelectedStaff(<any>this.user, this.index);

    this.router.navigate(['..'], { relativeTo: this.activeRoute, queryParams: { close: true } });

  }

}
