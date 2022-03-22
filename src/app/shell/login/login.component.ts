import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mobiscroll } from '@mobiscroll/angular';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CrossService } from '../../services/cross.service';
import { PlacesDBService } from '../../services/places.dbservice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;

  showLogin: boolean = false;

  userAuthSub: Subscription;

  return: string = '';

  formSettings = {
    theme: 'ios'
  };


  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private activeRoute: ActivatedRoute,
    private crossService: CrossService,
    private placesDBService: PlacesDBService ) {

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }


  ngOnInit() {

console.log('loading login component');
    this.userAuthSub = this.authService.user$.pipe(
      take(1),
      map(user => user != null ? true : false)
    )
      .subscribe(isUser => {
        if (isUser) {
          console.log('User logged in');
          this.showLogin = false;
        }
        else {
          console.log('User Not logged in');
          this.showLogin = true;
        }
      });

    this.activeRoute.queryParams
      .subscribe(params => {
        this.return = params['return']
      });

  }

  markFieldsDirty() {
    for (var field in this.loginForm.controls) {
      this.loginForm.controls[field].markAsDirty();
    }
  }


  logIn(ev) {


    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)

        .then(result => {

          if (result) {

            // this.crossService.retrieveServiceData();   //Special handling for mobiscroll tree data

            // this.placesDBService.getPlacesFromDB();

            if(this.return === undefined ){

              this.router.navigate(['home']);

            }
            else{
              this.router.navigate([this.return]);
            }


          }
          else {
            console.log('Was not able to login');
          }
        }).catch(error => {

          console.log(error);

        });

    } else {
      this.markFieldsDirty();
    }


  }

  errorMessages = {
    required: '{$1} required',
    minlength: 'At least 6 characters required',
    email: 'Invalid email address'
  }

  errorFor(fieldName) {

    var field = this.loginForm.controls[fieldName];

    for (var validator in field.errors) {

      if (field.errors[validator]) {
        var friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        return this.errorMessages[validator].replace('{$1}', friendlyName);
      }

    }

    return null;

  }


  ngOnDestroy() {

    this.userAuthSub.unsubscribe();

  }

}
