import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';
import { CrossService } from '../services/cross.service';
import { PlacesDBService } from '../services/places.dbservice';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router,
    private activeRoute: ActivatedRoute,
    private crossService: CrossService,
    private placesDBService: PlacesDBService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.superAdmin ? true : false),
      tap(isAdmin => {

        console.log('Guard admin is '+isAdmin);
        if (!isAdmin) {
          this.router.navigate(['login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
        else {

          console.log('retrieving application data');

          this.crossService.retrieveServiceData();   //Special handling for mobiscroll tree data

          this.placesDBService.getPlacesFromDB();

          return true;
        }
      })
    );

  }
}
