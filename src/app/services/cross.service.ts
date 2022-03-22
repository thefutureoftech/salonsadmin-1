import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../model/categoryService.service';
import { Services } from '../model/services';
import { User } from '../model/user';
import { StoreDBService } from './store.dbservice';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CrossService {

    private formClearanceSubject = new BehaviorSubject<boolean>(false);
    private selectedService: { service: CategoryService, index1: number, index2: number, index3: number };
    private serviceData: Partial<Services>[];
    private staff: User[];
    dataRecieved: Subject<Partial<Services>[]> = new Subject<any>();
    loading: boolean;


    constructor(private storeDBService: StoreDBService) {

        this.serviceData = [];

        // this.storeDBService.fillServices(this.serviceData,  this.setServiceData.bind(this));

        // this.serviceData =

        //     [
        //         {
        //             "label": "Hair",
        //             "children":
        //                 [
        //                     {
        //                         "label": "Hair Trimming",
        //                         "children":
        //                             [
        //                                 { name: "Shaving", arabicName: 'يسشيسشي', parent: ' dsds', price: 50, period: 15,  selected: true },
        //                                 { name: "Cutting", arabicName: 'يسشيسشي', parent: ' dsds', price: 10, period: 15,  selected: true }
        //                             ]
        //                     },
        //                     {
        //                         "label": "Hair Styling",
        //                         "children":
        //                             [

        //                                 { name: "تمليس", arabicName: 'يسشيسشي', parent: ' dsds', price: 12, period: 30,  selected: true },
        //                                 { name: "Dye", arabicName: 'يسشيسشي', parent: ' dsds', price: 13, period: 45,  selected: true }
        //                             ]
        //                     }
        //                 ]
        //         },
        //         {
        //             "label": "Hands",
        //             "children":
        //                 [
        //                     {
        //                         "label": "Hands washing",
        //                         "children":
        //                             [

        //                                 { name: "Nice washing", arabicName: 'يسشيسشي', parent: ' dsds', price: 50, period: 30,  selected: true },
        //                                 { name: "Deep Washing", arabicName: 'يسشيسشي', parent: ' dsds', price: 10, period: 45,  selected: true }
        //                             ]
        //                     },
        //                     {
        //                         "label": "نقش حناء",
        //                         "children":
        //                             [
        //                                 { name: "نقش سريع", arabicName: 'يسشيسشي', parent: ' dsds', price: 45, period: 45,  selected: true },
        //                                 { name: "نقش عميق", arabicName: 'يسشيسشي', parent: ' dsds', price: 100, period: 30,  selected: true }
        //                             ]
        //                     }
        //                 ]
        //         }
        //     ];

    }


    retrieveServiceData(){

        this.serviceData = [];

        this.storeDBService.fillServices(this.serviceData,  this.setServiceData.bind(this));

    }


    subToFormClearance() {
        console.log('sending subscription');
        return this.formClearanceSubject.asObservable();
    }


    sendFormClearFlag(flag: boolean) {
        console.log('sending clear flag of '+flag);
        this.formClearanceSubject.next(flag);
    }

    setSelectedService(service, index1, index2, index3) {
        this.selectedService = { service, index1, index2, index3 };
    }

    getSelectedService() {

        return this.selectedService;
    }

    setServiceData(data: any[]) {

        this.serviceData = data;

        this.dataRecieved.next(this.serviceData );

    }

    sendRecievedData(){

        this.dataRecieved.next(this.serviceData );

    }

    getRecievedData(){

        return this.dataRecieved.asObservable();

    }



    getServiceData() {

        return this.serviceData

    }

    addService(service, catIndex, subCatIndex) {

        let index = 0;

        if (this.serviceData[catIndex].children[subCatIndex].children.length) {
            index = this.serviceData[catIndex].children[subCatIndex].children.length;
        }

        this.serviceData[catIndex].children[subCatIndex].children[index] = service;

        return index;

    }

}
