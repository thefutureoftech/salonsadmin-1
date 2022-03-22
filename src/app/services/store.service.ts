import { Injectable } from "@angular/core";
import { Store } from "../model/store";
import { Branch } from '../model/branch';
import { Hours } from '../model/hours';
import { StoreDBService } from './store.dbservice';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: Partial<Store>;

  private branch: Partial<Branch>;


  private schedule: Partial<Hours>[] = [
    {
      dayName: 'Sun',
      arabicName: 'الأحد',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '0',
    },
    {
      dayName: 'Mon',
      arabicName: 'الإثنين',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '1'
    },
    {
      dayName: 'Tue',
      arabicName: 'الثلاثاء',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '2'
    },
    {
      dayName: 'Wed',
      arabicName: 'الأربعاء',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '3'
    },
    {
      dayName: 'Thu',
      arabicName: 'الخميس',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '4'
    },
    {
      dayName: 'Fri',
      arabicName: 'الجمعه',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '5'
    },
    {
      dayName: 'Sat',
      arabicName: 'السبت',
      fromTime: new Date(),
      toTime: new Date(),
      fromTime2: new Date(),
      toTime2: new Date(),
      daySelected: true,
      dayNum: '6'
    }
  ];


  constructor(){

    this.setStore(null);

    this.setBranch(null);

  }


  setStore(store: Partial<Store>) {

    if (!this.store) {
      this.store = new Store();

    }
    else{

      this.store = { ...store };

    }

  }

  getStore() {

    return { ...this.store };

  }


  setBranch(branch: Partial<Branch>) {

    if (!this.branch) {
      this.branch = new Branch();

      this.branch.schedule = this.schedule;
console.log('cleared branch');

    }
    else{

      this.branch = { ...branch };

    }


  }


  getBranch() {

    return { ...this.branch };

  }



}
