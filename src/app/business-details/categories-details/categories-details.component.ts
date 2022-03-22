import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrossService } from '../../services/cross.service';
import { CategoryService } from '../../model/categoryService.service';


@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private crossService: CrossService) { }

  service: CategoryService;

  tempService: CategoryService;

  formSettings = {
    theme: 'ios'
  };

  nonFormSettings: any = {
    theme: 'ios',
    display: 'bottom',
    maxWidth: 50,
    cssClass: 'demo-non-form',
    headerText: '<p color="primary">(Minutes)</p>'
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

  newMode: boolean;

  canceled: boolean;

  catIndex: number;

  subCatIndex: number;

  ngOnInit() {

    this.activeRoute.queryParams
      .subscribe(params => {
        if (params.mode === 'new') {
          // this.service = {
          //   id: '',
          //   name: ' ',
          //   arabicName: ' ',
          //   parent: ' '
          // };
          this.newMode = true;
          this.catIndex = params.catIndex;
          this.subCatIndex = params.subCatIndex;
        }
        else{
          this.service = this.crossService.getSelectedService().service;
          this.newMode = false;
        }
      });

      this.tempService = {...this.service};
      
      this.canceled = false;
  }


  cancel(){

    this.canceled = true;
    this.goBack();
  
  }


  goBack() {

    let name: string;

    name = this.service.name;

    if(this.newMode && this.canceled === false){

      let newIndex = this.crossService.addService(this.service, this.catIndex, this.subCatIndex);
      
      this.crossService.setSelectedService(this.service, this.catIndex, this.subCatIndex, newIndex);

    }

    if(this.newMode && this.canceled){

      let services = this.crossService.getServiceData();

      name = services[this.catIndex].children[this.subCatIndex].label;

    }

    this.canceled = false;

    this.router.navigate(['..'], { relativeTo: this.activeRoute, queryParams: { name: name, close: true } });

  }

}
