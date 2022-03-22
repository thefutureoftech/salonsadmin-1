import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { MbscSelectOptions } from '@mobiscroll/angular';
import { StoreDBService } from '../../services/store.dbservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../model/store';
import { StoreService } from '../../services/store.service';
import { PlacesDBService } from '../../services/places.dbservice';
import { Country } from '../../model/country';
import { State } from '../../model/state';
import { City } from '../../model/city';
import { Town } from '../../model/town';
import { Branch } from '../../model/branch';



@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  store: Partial<Store>;

  branch: Partial<Branch>;

  logoFile: any;

  itemSelected: boolean;

  latitude: number;

  longitude: number;

  formSettings = {
    theme: 'ios'
  };

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };

  selectOptions2: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };

  selectOptions3: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };

  selectOptions4: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };


  busTypeData = [{ text: '', value: '0' }, { text: 'salons', value: '1' }];

  countries: any[] = [];

  countryList: Country[];

  states: any[] = [];

  stateList: State[];

  selectedState: string;

  cities: any[] = [];

  cityList: City[];

  towns: any[] = [];

  townList: Town[];

  storeId: string;

  readOnly: boolean;


  imagePath: string;

  @ViewChild('countrySelect')
  countrySelect;

  @ViewChild('stateSelect')
  stateSelect;

  @ViewChild('citySelect')
  citySelect;

  @ViewChild('townSelect')
  townSelect;


  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private storeService: StoreService, private placesDBService: PlacesDBService,
    private storeDBService: StoreDBService) { }

  ngOnInit() {

    console.log(this.activeRoute.snapshot.params);

    this.storeId = this.activeRoute.snapshot.queryParams.storeId;

    if (this.storeId) {

      this.readOnly = true;

    }

    this.store = this.storeService.getStore();

    this.branch = this.storeService.getBranch();

    if (this.store.logoURL) {

      this.logoFile = this.store.logoURL;

      this.branch.storeLogoURL = this.store.logoURL;

    }

    if (this.branch.location.latitude) {
      this.latitude = this.branch.location.latitude;
      this.longitude = this.branch.location.longitude;
    }

    this.setPlaces();

    this.setSelection();


  }


  setPlaces() {


    this.setCountries(this.placesDBService.getCountries());

    // this.placesDBService.getCountriesFromDB(this.setCountries.bind(this));

    if (this.store.countryId != undefined) {

      this.setStates(this.placesDBService.getStates());

      // this.placesDBService.getStatesFromDB(this.setStates.bind(this), this.store.countryId);

      if (this.branch.address.stateId != undefined) {

        this.setCities(this.placesDBService.getCities());

        // this.placesDBService.getCitiesFromDB(this.setCities.bind(this), this.branch.address.stateId);

        if (this.branch.address.cityId != '') {

          this.setTowns(this.placesDBService.getTowns());

          // this.placesDBService.getTownsFromDB(this.setTowns.bind(this), this.branch.address.cityId);

        }

      }

    }


  }


  setSelection() {


    setTimeout(() => {
      if (this.countrySelect && this.store.countryId) {
        this.countrySelect.instance.setVal(this.store.countryId, true, false);
      }
    });


    setTimeout(() => {
      if (this.stateSelect && this.branch.address.stateId) {

        this.stateSelect.instance.setVal(this.branch.address.stateId, true, false);

      }
    });

    setTimeout(() => {
      if (this.citySelect && this.branch.address.cityId) {

        this.citySelect.instance.setVal(this.branch.address.cityId, true, false);;

      }
    });


    setTimeout(() => {
      if (this.townSelect && this.branch.address.townId) {

        this.townSelect.instance.setVal(this.branch.address.townId, true, false);;

      }
    });


  }


  setCountries(countries: Country[]) {

    this.countryList = [];

    this.countryList = countries;

    for (let entry in this.countries) {
      this.countries.pop();
    }

    this.countries.push({ text: '', value: '0' });

    this.countryList.forEach(country => {

      this.countries.push({
        text: country.name,
        value: country.id
      });

    });

    console.log('Selected country id here is: ' + this.store.countryId);
    console.log(this.countries);


  }


  setStates(states: State[]) {

    this.stateList = states;

    this.states = [];

    this.states.push({ text: '', value: '0' });

    this.stateList.forEach(state => {

      this.states.push({
        text: state.name,
        value: state.id
      });

    });
    console.log('Selected state id here is: ' + this.branch.address.stateId);
    console.log(this.states);


  }


  setCities(cities: City[]) {

    this.cityList = cities;

    this.cities = [];

    this.cities.push({ text: '', value: '0' });

    this.cityList.forEach(city => {

      this.cities.push({
        text: city.name,
        value: city.id
      });

    });


  }


  setTowns(towns: Town[]) {

    this.townList = towns;

    this.towns = [];

    this.towns.push({ text: '', value: '0' });

    this.townList.forEach(town => {

      this.towns.push({
        text: town.name,
        value: town.id
      });

    });


  }




  proceed(form: NgForm) {

    this.storeService.setStore(this.store);

    this.branch.location = new firebase.firestore.GeoPoint(+this.latitude, +this.longitude);

    this.storeService.setBranch(this.branch);

    this.router.navigate(['hours'], { relativeTo: this.activeRoute, queryParams: { storeId: this.storeId }  });

  }

  goBack() {

    this.router.navigate(['owner']);

  }

  fileChangeEvent(event) {

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.logoFile = e.target.result;
      this.store.logo = this.logoFile;
    };

    reader.readAsDataURL(event.target.files[0]);

  }


  countrySelected(event) {

    let selected = this.countryList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.store.countryId = '';

    }
    else {

      this.store.countryId = selected.id;

      // this.placesDBService.getStatesFromDB(this.setStates.bind(this), this.store.countryId, );

      this.setStates(this.placesDBService.getStates(this.store.countryId));

    }

    this.branch.address.stateId = '';

    this.branch.address.cityId = '';

    this.branch.address.townId = '';

    this.cities = [];

    this.towns = [];

  }


  stateSelected(event) {

    let selected = this.stateList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.branch.address.stateId = '';

    }
    else {

      this.branch.address.stateId = selected.id;

      // this.placesDBService.getCitiesFromDB(this.setCities.bind(this), this.branch.address.stateId);

      this.setCities(this.placesDBService.getCities(this.branch.address.stateId));

    }

    this.branch.address.cityId = '';

    this.branch.address.townId = '';

    this.towns = [];

  }


  citySelected(event) {

    let selected = this.cityList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.branch.address.cityId = '';

    }
    else {

      this.branch.address.cityId = selected.id;

      // this.placesDBService.getTownsFromDB(this.setTowns.bind(this), this.branch.address.cityId);

      this.setTowns(this.placesDBService.getTowns(this.branch.address.cityId));

    }

    this.branch.address.townId = '';


  }


  getLocation() {

    this.storeDBService.getUserLocation(this.printCoords.bind(this));

  }


  printCoords(lat: number, lon: number) {

    this.latitude = lat;

    this.longitude = lon;

  }


}
