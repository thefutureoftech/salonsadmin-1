import { Component, OnInit } from '@angular/core';
import { Town } from '../../model/town';
import { PlacesDBService } from '../../services/places.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { MbscSelectOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-town-admin',
  templateUrl: './town-admin.component.html',
  styleUrls: ['./town-admin.component.css']
})
export class TownAdminComponent implements OnInit {


  citySelected: boolean;

  displaySelected : boolean;

  towns: any[] = [];

  townList: Town[];

  selected: string;

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };


  constructor(private placesDBService: PlacesDBService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    if (this.placesDBService.getSelectedCity()) {

      this.citySelected = true;
    }
    else {

      this.citySelected = false;

      this.placesDBService.setSelectedTown(null);

      return;

    }


    this.placesDBService.getTownsFromDB(this.setTowns.bind(this), this.placesDBService.getSelectedCity().id);

    if (this.placesDBService.getSelectedTown()) {

      let id = this.placesDBService.getSelectedTown().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'Town' } });

    }

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

    if (this.placesDBService.getSelectedTown()) {

      let selected = this.townList.find(item => {

        return (this.placesDBService.getSelectedTown().id === item.id);

      });

      if (selected) {

        this.displaySelected = true;

        this.selected = selected.id;

      }
      else{

        this.displaySelected = false;

        this.placesDBService.setSelectedTown(null);

      }

    };


  }


  townSelected(event) {

    let selected = this.townList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.router.navigate(['../towns'], { relativeTo: this.activeRoute });

      this.placesDBService.setSelectedTown(null);

      this.displaySelected = false;

    }
    else {

      this.placesDBService.setSelectedTown(selected.id);

      this.displaySelected = true;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'Town' } });

    }

  }


  createNewTown() {

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'Town' } });

    this.displaySelected = true;


  }



}
