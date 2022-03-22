import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlacesDBService } from '../../services/places.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from '../../model/city';
import { MbscSelectOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-city-admin',
  templateUrl: './city-admin.component.html',
  styleUrls: ['./city-admin.component.css']
})
export class CityAdminComponent implements OnInit {

  stateSelected: boolean;

  cities: any[] = [];

  citiesList: City[];

  displaySelected: boolean;

  selected: string;

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };


  constructor(private placesDBService: PlacesDBService,
    private router: Router, private activeRoute: ActivatedRoute, private ref: ChangeDetectorRef) { }

  ngOnInit() {


    if (this.placesDBService.getSelectedState()) {

      this.stateSelected = true;
    }
    else {

      this.stateSelected = false;

      this.placesDBService.setSelectedCity(null);

      return;

    }


    this.placesDBService.getCitiesFromDB(this.setCities.bind(this), this.placesDBService.getSelectedState().id);

    if (this.placesDBService.getSelectedCity()) {

      let id = this.placesDBService.getSelectedCity().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'City' } });

    }


  }


  setCities(cities: City[]) {

    this.citiesList = [];

    this.citiesList = cities;

    this.cities = [];

    this.cities.push({ text: '', value: '0' });

    this.citiesList.forEach(city => {

      this.cities.push({
        text: city.name,
        value: city.id
      });

    });

    if (this.placesDBService.getSelectedCity()) {

      let selected = this.citiesList.find(item => {

        return (this.placesDBService.getSelectedCity().id === item.id);

      });

      if (selected) {

        this.displaySelected = true;

        this.selected = selected.id;

      }
      else{

        this.displaySelected = false;

        this.placesDBService.setSelectedCity(null);

      }

    };

    // if(!this.displaySelected){

    //   this.placesDBService.setSelectedCity(null);

    // }


  }


  citySelected(event) {

    let selected = this.citiesList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.router.navigate(['../cities'], { relativeTo: this.activeRoute });

      this.placesDBService.setSelectedCity(null);

      this.displaySelected = false;

    }
    else {

      this.placesDBService.setSelectedCity(selected.id);

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'City' } });

      this.displaySelected = true;

    }

  }








  createNewCity() {

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'City' } });

    this.displaySelected = true;


  }


}
