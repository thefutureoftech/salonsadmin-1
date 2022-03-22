import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrossService } from '../../services/cross.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  // @ViewChild('myList')
  // myList: any;

  formSettings = {
    theme: 'ios'
  };

  nonFormSettings: any = {
    theme: 'ios',
    display: 'bottom',
    maxWidth: 50,
    cssClass: 'demo-non-form'
  };

  selectedId: any;

  listviewSettings: any = {
    theme: 'mobiscroll',
    swipe: false,
    enhance: true,
    onInit: (event, inst) => {
      console.log('Navigating to ' + this.selectedId);

      inst.navigate(this.selectedId);
    }

  };

  items = [{
    value: 15,
    text: '15'
  }, {
    value: 30,
    text: '30'
  }, {
    value: 45,
    text: '45'
  }];

  slider: number = 15;

  services: any;

  services2: any;

  SelectServices: any[];

  minutes: any[];

  activateTab: boolean = false;

  servicesVisible: boolean;


  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private crossService: CrossService) {
      this.crossService.retrieveServiceData();

    }

  ngOnInit() {

     this.crossService.getRecievedData().subscribe(data =>{

      this.services2 = data;
      console.log('Data Recieved');
      console.log(this.services2);
      this.servicesVisible = true;

    });



    // if(this.crossService.getServiceData()){

    //   this.services2 = this.crossService.getServiceData();

    //   this.servicesVisible = true;
    // }

    // this.crossService.sendRecievedData();

    this.activeRoute.queryParams.subscribe(params => {

      this.selectedId = params.name;

      if (this.crossService.getSelectedService()) {

        let i1 = this.crossService.getSelectedService().index1;
        let i2 = this.crossService.getSelectedService().index2;
        let i3 = this.crossService.getSelectedService().index3;
        this.services2[i1].children[i2].children[i3] = this.crossService.getSelectedService().service;

      }

      if (params.close) {
        this.closeDetails();
      }

    });


  }



  proceed(){

    this.router.navigate(['../employees'], {relativeTo: this.activeRoute});

  }


  // onEndNav(event) {

  //   if (event.level === 2) {
  //     this.activateTab = true;
  //   }
  //   else {
  //     this.activateTab = false;
  //   }

  // }

  onTap(event) {
    // console.log(event);
    // if(this.activateTab && event.target.textContent != 'Back' && event.target.innerText != ''){
    //   console.log(event.target.innerText);
    // }

    // return false;

  }

  lastNodeClicked(last, index1, index2, index3) {
    console.log('Edit clicked');
    this.activateTab = true;
    this.crossService.setSelectedService(last, index1, index2, index3);
    this.router.navigate(['serviceDetails'], { relativeTo: this.activeRoute });
  }

  newService(catIndex, subCatIndex) {

    this.activateTab = true;
    this.router.navigate(['serviceDetails'], {
      relativeTo: this.activeRoute, queryParams: {
        mode: 'new',
        catIndex: catIndex,
        subCatIndex: subCatIndex
      }
    });


  }


  goBack() {

    this.router.navigate(['../hours'], {relativeTo: this.activeRoute});

  }

  closeDetails() {
    this.activateTab = false;
  }

}
