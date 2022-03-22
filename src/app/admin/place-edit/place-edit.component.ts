import { Component, OnInit } from '@angular/core';
import { PlacesDBService } from '../../services/places.dbservice';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from '../../model/country';
import { State } from '../../model/state';
import { City } from '../../model/city';
import { Town } from '../../model/town';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {


  country: Partial<Country>;

  type: string;

  state: Partial<State>;

  city: Partial<City>;

  town: Partial<Town>;

  editMode: boolean = false;

  cancelDelete: string;

  formSettings = {
    theme: 'ios'
  };


  constructor(private placesDBService: PlacesDBService,
    private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {


    this.activeRoute.queryParams.subscribe(params => {

      if (params.id != undefined) {

        if (params.type === 'Country') {

          if (!this.placesDBService.getCountries()) {

            this.router.navigate(['../../countries'], { relativeTo: this.activeRoute });

            return;

          }

          this.country = this.placesDBService.getCountry(params.id);

          this.type = params.type;

          this.editMode = true;

        }
        else if (params.type === 'State') {

          if (!this.placesDBService.getStates()) {

            this.router.navigate(['../../states'], { relativeTo: this.activeRoute });

            return;

          }

          this.state = this.placesDBService.getState(params.id);

          this.type = params.type;

          this.editMode = true;

        }
        else if (params.type === 'City') {

          if (!this.placesDBService.getCities()) {

            this.router.navigate(['../../cities'], { relativeTo: this.activeRoute });

            return;

          }

          this.city = this.placesDBService.getCity(params.id);

          this.type = params.type;

          this.editMode = true;

        }

        else if (params.type === 'Town') {

          if (!this.placesDBService.getTowns()) {

            this.router.navigate(['../../towns'], { relativeTo: this.activeRoute });

            return;

          }

          this.town = this.placesDBService.getTown(params.id);

          this.type = params.type;

          this.editMode = true;

        }

      }
      else if ((<string>params.type).length > 0) {

        this.type = params.type
        this.editMode = false;

      }
      else {

        this.type = '';
        this.editMode = false;

      }


      if (this.editMode) {

        this.childrenExist();

      }
      else {

        if (this.type === 'Country') {

          this.country = {

            name: '',
            arabicName: '',
            currency: '',
            exRate: 0,
            code: ''

          };

        }
        else if (this.type === 'State') {

          this.state = {

            name: '',
            arabicName: '',
            parent: this.placesDBService.getSelectedCountry().id

          };
        }
        else if (this.type === 'City') {

          this.city = {

            name: '',
            arabicName: '',
            parent: this.placesDBService.getSelectedState().id

          };
        }
        else if (this.type === 'Town') {

          this.town = {

            name: '',
            arabicName: '',
            parent: this.placesDBService.getSelectedCity().id

          };

        }

        this.cancelDelete = 'Cancel';

      }


    });



  }



  childrenExist() {

    if (this.type === 'Country') {

      this.placesDBService.canDeleteCountry(this.country.id)

        .subscribe(states => {

          states.forEach(state => {

            if (state.parent === this.country.id) {

              this.cancelDelete = 'Cancel'

            }

          });

          if (this.cancelDelete != 'Cancel') {

            this.cancelDelete = 'Delete';

          }

        })

    }
    else if (this.type === 'State') {

      this.placesDBService.canDeleteState(this.state.id)

        .subscribe(cities => {

          if (cities.length > 0) {

            this.cancelDelete = 'Cancel';
          }
          else {

            this.cancelDelete = 'Delete';

          }

        })

    }
    else if (this.type === 'City') {

      this.placesDBService.canDeleteCity(this.city.id)

        .subscribe(town => {

          if (town.length > 0) {

            this.cancelDelete = 'Cancel';
          }
          else {

            this.cancelDelete = 'Delete';

          }

        })

    }
    else if (this.type === 'Town') {

      let can = this.placesDBService.canDeleteTown(this.town.id)

      if (can) {

        this.cancelDelete = 'Delete';

      }


    }


  }


  proceed(form: NgForm) {


    if (this.type === 'Country') {

      if (this.editMode) {

        this.placesDBService.saveCountry(this.country.id, this.country);

      }
      else {

        this.placesDBService.createCountry(this.country);

      }

      this.placesDBService.setSelectedCountry(null);

      this.router.navigate(['../../countries'], { relativeTo: this.activeRoute });
    }
    else if (this.type === 'State') {

      if (this.editMode) {

        this.placesDBService.saveState(this.state.id, this.state);

      }
      else {

        this.placesDBService.createState(this.state);

      }

      this.placesDBService.setSelectedState(null);

      this.router.navigate(['../../states'], { relativeTo: this.activeRoute });

    }
    else if (this.type === 'City') {

      if (this.editMode) {

        this.placesDBService.saveCity(this.city.id, this.city);

      }
      else {

        this.placesDBService.createCity(this.city);

      }

      this.placesDBService.setSelectedCity(null);

      this.router.navigate(['../../cities'], { relativeTo: this.activeRoute });

    }
    else if (this.type === 'Town') {

      if (this.editMode) {

        this.placesDBService.saveTown(this.town.id, this.town);

      }
      else {

        this.placesDBService.createTown(this.town);

      }

      this.placesDBService.setSelectedTown(null);

      this.router.navigate(['../../towns'], { relativeTo: this.activeRoute });

    }



  }


  cancelOrDelete() {


    if (this.type === 'Country') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../countries'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.placesDBService.deleteCountry(this.country.id);

        this.router.navigate(['../../countries'], { relativeTo: this.activeRoute });

      }

      this.placesDBService.setSelectedCountry(null);

    }
    else if (this.type === 'State') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../states'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.placesDBService.deleteState(this.state.id);

        this.router.navigate(['../../states'], { relativeTo: this.activeRoute });

      }

      this.placesDBService.setSelectedState(null);

    }
    else if (this.type === 'City') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../cities'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.placesDBService.deleteCity(this.city.id);

        this.router.navigate(['../../cities'], { relativeTo: this.activeRoute });

      }

      this.placesDBService.setSelectedCity(null);

    }
    else if (this.type === 'Town') {

      if (this.cancelDelete === 'Cancel') {

        this.router.navigate(['../../towns'], { relativeTo: this.activeRoute });

      }
      else if (this.cancelDelete === 'Delete') {

        this.placesDBService.deleteTown(this.city.id);

        this.router.navigate(['../../towns'], { relativeTo: this.activeRoute });

      }

      this.placesDBService.setSelectedTown(null);

    }


  }


}
