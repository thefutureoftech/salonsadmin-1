import { Component, OnInit } from '@angular/core';
import { PlacesDBService } from '../../services/places.dbservice';
import { State } from '../../model/state';
import { Router, ActivatedRoute } from '@angular/router';
import { MbscSelectOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-state-admin',
  templateUrl: './state-admin.component.html',
  styleUrls: ['./state-admin.component.css']
})
export class StateAdminComponent implements OnInit {

  countrySelected: boolean;

  displaySelected: boolean;

  states: any[] = [];

  stateList: State[];

  selected: string;

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };


  constructor(private placesDBService: PlacesDBService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    if (this.placesDBService.getSelectedCountry()) {

      this.countrySelected = true;
    }
    else {

      this.countrySelected = false;

      this.placesDBService.setSelectedState(null);

      return;

    }


    this.placesDBService.getStatesFromDB(this.setStates.bind(this), this.placesDBService.getSelectedCountry().id);

    if (this.placesDBService.getSelectedState()) {

      let id = this.placesDBService.getSelectedState().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'State' } });

    }


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


    if (this.placesDBService.getSelectedState()) {

      let selected = this.stateList.find(item => {

        return (this.placesDBService.getSelectedState().id === item.id);

      });

      if (selected) {

        this.displaySelected = true;

        this.selected = selected.id;

      }
      else{

        this.displaySelected = false;

        this.placesDBService.setSelectedState(null);

      }

    };


  }


  stateSelected(event) {

    let selected = this.stateList.find(item => {
      return (item.name === event.valueText);
    })

    if (!selected) {

      this.router.navigate(['../states'], { relativeTo: this.activeRoute });

      this.placesDBService.setSelectedState(null);

      this.displaySelected = false;

    }
    else {

      this.placesDBService.setSelectedState(selected.id);

      this.displaySelected = true;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'State' } });

    }

  }


  createNewState() {

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'State' } });

    this.displaySelected = true;


  }


}
