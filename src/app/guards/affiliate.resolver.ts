import { Injectable } from '@angular/core';


import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AffiliateService } from '../services/affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliateResolver implements Resolve<any> {
  constructor(private affiliatedService: AffiliateService) { }

  resolve(route: ActivatedRouteSnapshot) {

    console.log(route.params.type);  //requests or members

    console.log(route.params.id);

    console.log(route.url[0].path);

    if (route.url[0].path === 'editaffiliate') {

      let typePromise = new Promise((res, rej) => { res({ type: route.params.type }) });

      let dataPromise = this.affiliatedService.getAffiliatesData(route.params.type, route.params.id);

      return Promise.all([typePromise, dataPromise]);

    }
    else {

      let typePromise = new Promise((res, rej) => { res({ type: route.params.type }) });

      let dataPromise = this.affiliatedService.getAffiliatesData(route.params.type)

      return Promise.all([typePromise, dataPromise]);

    }

  }
}
