import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../model/categoryService.service';
import { CategoryDBService } from '../../../services/category.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { MbscSelectOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.css']
})
export class ServiceAdminComponent implements OnInit {

  categorySelected: boolean;

  displaySelected: boolean;

  services: any[] = [];

  serviceList: CategoryService[];

  selected: string;

  selectOptions: MbscSelectOptions;


  constructor(private categoryDBService: CategoryDBService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.selectOptions = {
      theme: 'ios'
    };

    if (this.categoryDBService.getSelectedCategory()) {

      this.categorySelected = true;
    }
    else {

      this.categorySelected  = false;

      this.categoryDBService.setSelectedService(null);

      return;

    }


    this.categoryDBService.getServicesFromDB(this.categoryDBService.getSelectedCategory().id, this.setServices.bind(this));

    if (this.categoryDBService.getSelectedService()) {

      let id = this.categoryDBService.getSelectedService().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'Service' } });

    }

  }


  setServices(services: CategoryService[]) {

    this.serviceList = services;

    this.services = [];

    this.services.push({ text: '', value: '0' });

    this.serviceList.forEach(service => {

      this.services.push({
        text: service.name,
        value: service.id
      });

    });

    if (this.categoryDBService.getSelectedService()) {

      let selected = this.serviceList.find(item => {

        return (this.categoryDBService.getSelectedService().id === item.id);

      });

      if (selected) {

        this.displaySelected = true;

        this.selected = selected.id;

      }
      else {

        this.displaySelected = false;

        this.categoryDBService.setSelectedService(null);

      }

    };


  }


  serviceSelected(event) {

    let selected = this.serviceList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.router.navigate(['../service'], { relativeTo: this.activeRoute });

      this.categoryDBService.setSelectedService(null);

      this.displaySelected = false;

    }
    else {

      this.categoryDBService.setSelectedService(selected.id);

      this.displaySelected = true;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'Service' } });

    }

  }


  createNewService() {

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'Service' } });

    this.displaySelected = true;


  }

}
