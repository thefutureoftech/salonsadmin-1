import { Component, OnInit } from '@angular/core';
import { PlacesDBService } from '../../services/places.dbservice';
import { Country } from '../../model/country';
import { Router, ActivatedRoute } from '@angular/router';
import { MbscSelectOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-country-admin',
  templateUrl: './country-admin.component.html',
  styleUrls: ['./country-admin.component.css']
})
export class CountryAdminComponent implements OnInit {

  countries: any[] = [];

  countrList: Country[];

  formSettings = {
    theme: 'ios'
  };

  selected: string;

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };

  constructor(private placesDBService: PlacesDBService,
              private router: Router, private activeRoute: ActivatedRoute) {


  }

  ngOnInit() {

    this.placesDBService.getCountriesFromDB(this.setCountries.bind(this));

    if(this.placesDBService.getSelectedCountry()){

      let id = this.placesDBService.getSelectedCountry().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'Country' } });

    }


  }


  setCountries(countries: Country[]) {

    this.countrList = countries;

    for(let entry in this.countries)
    {
      this.countries.pop();
    }

    this.countries.push({ text: '', value: '0' });

    this.countrList.forEach(country => {

      this.countries.push({
        text: country.name,
        value: country.id
      });

      if(this.placesDBService.getSelectedCountry()){

        if(this.placesDBService.getSelectedCountry().id === country.id){

          this.selected = country.id;
          
        }

      }

    });

  }


  countrySelected(event) {

    let selected = this.countrList.find(item => {
      return (item.name === event.valueText);
    })
  
    if(!selected){

      this.router.navigate(['../countries'], { relativeTo: this.activeRoute});

      this.placesDBService.setSelectedCountry(null);
      
    }
    else{

      this.placesDBService.setSelectedCountry(selected.id);

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'Country' } });

    }
    

  }


  createNewCountry(){

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'Country' } });

  }




}
