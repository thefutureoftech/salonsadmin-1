import { Injectable, OnInit, ɵConsole } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Country } from '../model/country';
import { State } from '../model/state';
import { City } from '../model/city';
import { Town } from '../model/town';
import { Observable } from 'rxjs';
import { CrossService } from './cross.service';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PlacesDBService implements OnInit {

    countries: Country[];
    selectedCountry: Country;

    states: State[];
    selectedState: State;

    cities: City[];
    selectedCity: City;

    towns: Town[];
    selectedTown: Town;


    constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private crossService: CrossService) {

    }

    ngOnInit() {



    }


    getPlacesFromDB() {

        this.getCountriesFromDB(this.setCountries.bind(this));

        this.getStatesFromDB(this.setStates.bind(this));

        this.getCitiesFromDB(this.setCities.bind(this));

        this.getTownsFromDB(this.setTowns.bind(this));

    }


    private setCountries(countries: Country[]) {

        this.countries = countries;

    }


    private setStates(states: State[]) {

        this.states = states;

    }

    private setCities(cities: City[]) {

        this.cities = cities;

    }


    private setTowns(towns: Town[]) {

        this.towns = towns;

        this.crossService.loading = true;

    }


    getCountriesFromDB(callback) {

        this.afs.collection('countries').snapshotChanges().pipe(map(actions => {

            return actions.map(action => {

                const data: any = action.payload.doc.data();
                const id = action.payload.doc.id;

                return { id, ...data };

            });
        }))
            .pipe(map((data: Country[]) => {

                return data;

            }))
            .subscribe(countries => {

                this.countries = countries;

                callback(countries);

            });

    }

    getStatesFromDB(callback, countrId?: string) {

        let statesCollection: AngularFirestoreCollection<any>;

        if (countrId) {

            statesCollection = this.afs.collection<any>('states', ref => ref.where('parent', '==', countrId));

        }
        else {

            statesCollection = this.afs.collection<any>('states');

        }

        statesCollection.snapshotChanges().pipe(map(actions => {

            return actions.map(action => {

                const data = action.payload.doc.data();
                const id = action.payload.doc.id;

                return { id, ...data };

            });
        }))
            .pipe(map((data: State[]) => {

                return data;

            }))
            .subscribe(states => {

                this.states = states;

                callback(states);

            });


    }


    getCitiesFromDB(callback, stateId?: string) {


        let citiesCollection: AngularFirestoreCollection<any>;

        if (stateId) {

            citiesCollection = this.afs.collection<any>('cities', ref => ref.where('parent', '==', stateId));

        }
        else {

            citiesCollection = this.afs.collection<any>('cities');

        }


        citiesCollection

            .snapshotChanges().pipe(map(actions => {

                return actions.map(action => {

                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };

                });
            }))
            .pipe(map((data: City[]) => {

                return data;

            }))
            .subscribe(cities => {

                this.cities = cities;

                callback(cities);

            });


    }


    getTownsFromDB(callback, cityId?: string) {


        let townsCollection: AngularFirestoreCollection<any>;

        if (cityId) {

            townsCollection = this.afs.collection<any>('towns', ref => ref.where('parent', '==', cityId));

        }
        else {

            townsCollection = this.afs.collection<any>('towns');

        }


        townsCollection

            .snapshotChanges().pipe(map(actions => {

                return actions.map(action => {

                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };

                });
            }))
            .pipe(map((data: Town[]) => {

                return data;

            }))
            .subscribe(towns => {

                this.towns = towns;

                callback(towns);

            });


    }



    getCountries() {

        if (this.countries) {

            return this.countries.slice();

        }
        else {

            return null;

        }


    }


    getStates(countryId?: string) {


        if (countryId) {

            let states = this.states.filter((state, index) => {

                return (state.parent == countryId);
            });

            return states;

        }

        if (this.states) {

            return this.states.slice();

        }

        return null;

    }

    getCities(stateId?: string) {

        if (stateId) {

            let cities = this.cities.filter((city, index) => {

                return (city.parent == stateId);
            });

            return cities;

        }

        if (this.cities) {

            return this.cities.slice();

        }

        return null;

    }


    getTowns(cityId?: string) {

        if (cityId) {

            let towns = this.towns.filter((town, index) => {

                return (town.parent == cityId);
            });

            return towns;

        }

        if (this.towns) {

            return this.towns.slice();

        }

        return null;

    }


    getCountry(id: string) {

        let country: Country = this.countries.find(item => {

            return (item.id === id);
        });

        return { ...country };

    }


    getState(id: string) {


        let state: State = this.states.find(item => {

            return (item.id === id);
        });

        return { ...state };


    }


    getCity(id: string) {

        let city: City = this.cities.find(item => {

            return (item.id === id);
        });

        return { ...city };


    }

    getTown(id: string) {

        let town: Town = this.towns.find(item => {

            return (item.id === id);
        });

        return { ...town };


    }


    saveCountry(id: string, country: Partial<Country>) {

        let countryNew: Partial<Country> = {};

        countryNew.name = country.name;
        countryNew.arabicName = country.arabicName;
        countryNew.code = country.code;
        countryNew.currency = country.currency;
        countryNew.exRate = country.exRate;


        this.afs.collection('countries').doc(id).update(countryNew);

    }

    saveState(id: string, state: Partial<State>) {

        let stateNew: Partial<State> = {};

        stateNew.name = state.name;
        stateNew.arabicName = state.arabicName;
        stateNew.parent = state.parent;

        this.afs.collection('states').doc(id).update(stateNew);

    }

    saveCity(id: string, city: Partial<City>) {

        let cityNew: Partial<City> = {};

        cityNew.name = city.name;
        cityNew.arabicName = city.arabicName;
        cityNew.parent = city.parent;

        this.afs.collection('cities').doc(id).update(cityNew);

    }

    saveTown(id: string, town: Partial<Town>) {

        let townNew: Partial<Town> = {};

        townNew.name = town.name;
        townNew.arabicName = town.arabicName;
        townNew.parent = town.parent;

        this.afs.collection('towns').doc(id).update(townNew);

    }


    deleteCountry(id: string) {

        this.afs.collection('countries').doc(id).delete();

    }

    deleteState(id: string) {

        this.afs.collection('states').doc(id).delete();

    }

    deleteCity(id: string) {

        this.afs.collection('cities').doc(id).delete();

    }

    deleteTown(id: string) {

        this.afs.collection('towns').doc(id).delete();

    }

    createCountry(country: Partial<Country>) {

        this.afs.collection('countries').add(country);

    }


    createState(state: Partial<State>) {

        this.afs.collection('states').add(state);

    }


    createCity(city: Partial<City>) {

        this.afs.collection('cities').add(city);

    }


    createTown(town: Partial<Town>) {

        this.afs.collection('towns').add(town);

    }


    canDeleteCountry(id: string) {

        return this.afs.collection<any>('states', ref => ref.where('parent', '==', id)).valueChanges().pipe(map((data: State[]) => {

            return data;

        }));

    }


    canDeleteState(id: string) {


        return this.afs.collection<any>('cities', ref => ref.where('parent', '==', id)).valueChanges().pipe(map((data: City[]) => {

            return data;

        }));


    }


    canDeleteCity(id: string) {


        return this.afs.collection<any>('towns', ref => ref.where('parent', '==', id)).valueChanges().pipe(map((data: Town[]) => {

            return data;

        }));


    }


    canDeleteTown(id: string) {


        return true;


    }


    setSelectedCountry(id: string) {

        if (!id) {

            this.selectedCountry = null;

            return;
        }

        this.selectedCountry = this.countries.find(item => {

            return (item.id === id);
        });

    }


    setSelectedState(id: string) {

        if (!id) {

            this.selectedState = null;

            return;
        }

        this.selectedState = this.states.find(item => {

            return (item.id === id);
        });

    }


    setSelectedCity(id: string) {

        if (!id) {

            this.selectedCity = null;

            return;
        }

        this.selectedCity = this.cities.find(item => {

            return (item.id === id);
        });

    }


    setSelectedTown(id: string) {

        if (!id) {

            this.selectedTown = null;

            return;
        }

        this.selectedTown = this.towns.find(item => {

            return (item.id === id);
        });

    }


    getSelectedCountry() {

        return this.selectedCountry;

    }


    getSelectedState() {

        return this.selectedState;

    }


    getSelectedCity() {

        return this.selectedCity;

    }

    getSelectedTown() {

        return this.selectedTown;

    }



}
