import { Component, OnInit } from '@angular/core';
import { MbscCardOptions, MbscDatetimeOptions, MbscFormOptions, MbscPopup, MbscPopupOptions, MbscSelectOptions } from '@mobiscroll/angular';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionDashboard } from '../../model/SubscriptionDashboard';
import { SignUpFormDetails } from '../../model/signupDetails';
import { PlacesDBService } from '../../services/places.dbservice';
import { PlanPricing } from '../../model/planPricing';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formSettings: MbscFormOptions = {
    theme: 'ios',
    themeVariant: 'light',
    inputStyle: 'outline',
    labelStyle: 'stacked'
  };

  cardSettings: MbscCardOptions = {
    lang: 'en',
    theme: 'ios'
  };

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    lang: 'en'

  };

  popUpSettings: MbscPopupOptions = {
    display: 'center',
    layout: 'liquid',
    buttons: [{
      text: 'Save',
      handler: async (event, inst) => {

        await this.savePlanPricing();

        console.log(inst);

        inst.hide();

      }
    },
    {
      text: 'Cancel',
      handler: 'cancel'
    }]

  };

  dateSettings: MbscDatetimeOptions = {
    display: 'bubble'
  };

  Dashboard: Partial<SubscriptionDashboard>;

  startSearch: boolean;

  startSearch2: boolean;

  startSearch3: boolean;

  startSearch4: boolean;

  searchValue: string;

  branchesSubscriptions: Partial<SignUpFormDetails>[];

  singleSubscription: Partial<SignUpFormDetails>;

  countries: Partial<{ text: string, value: string }>[] = [];

  states: Partial<{ text: string, value: string, parent: string }>[] = [];

  cities: Partial<{ text: string, value: string, parent: string }>[] = [];

  towns: Partial<{ text: string, value: string, parent: string }>[] = [];

  filteredCountries: Partial<{ text: string, value: string }>[] = [];

  filteredStates: Partial<{ text: string, value: string, parent: string }>[] = [];

  filteredCities: Partial<{ text: string, value: string, parent: string }>[] = [];

  filteredTowns: Partial<{ text: string, value: string, parent: string }>[] = [];

  subscriptionPackagesData: Partial<{ text: string, value: string }>[] = [
    { text: 'Monthly', value: 'card1' },
    { text: 'Yearly', value: 'card2' }
  ];

  planPricingData: Partial<PlanPricing>;

  selectedPackage: string = 'card1';

  searchOptionData: Partial<{ text: string, value: string }>[] = [{ value: '1', text: 'By Email' }, { value: '2', text: 'By Branch Name' }];

  selectedSearch: string = '1';

  constructor(private subscriptionService: SubscriptionService, private placesDBService: PlacesDBService, private authService: AuthService) { }

  ngOnInit(): void {


  }


  fillPlaces() {

    this.placesDBService.getCountries().forEach(country => {

      this.countries.push({ value: country.id, text: country.name });

    });

    this.placesDBService.getStates().forEach(state => {

      this.states.push({ value: state.id, text: state.name, parent: state.parent });

      if (state.parent == this.singleSubscription.branchData.address.countryId) {

        this.filteredStates.push({ value: state.id, text: state.name, parent: state.parent });

      }

    });

    this.placesDBService.getCities().forEach(city => {

      this.cities.push({ value: city.id, text: city.name, parent: city.parent });

      if (city.parent == this.singleSubscription.branchData.address.stateId) {

        this.filteredCities.push({ value: city.id, text: city.name, parent: city.parent });

      }

    });

    this.placesDBService.getTowns().forEach(town => {

      this.towns.push({ value: town.id, text: town.name, parent: town.parent });

      if (town.parent == this.singleSubscription.branchData.address.cityId) {

        this.filteredTowns.push({ value: town.id, text: town.name, parent: town.parent });

      }

    });




  }


  countrySelected(event) {

    this.singleSubscription.branchData.address.stateId = '';

    this.filteredStates = [];

    this.filteredStates.push({ value: '0', text: '', parent: '' });

    this.states.forEach(state2 => {

      if (state2.parent == this.singleSubscription.branchData.address.countryId) {

        this.filteredStates.push({ value: state2.value, text: state2.text, parent: state2.parent });

      }

    });

    this.singleSubscription.branchData.address.cityId = '';

    this.filteredCities = [];

    this.singleSubscription.branchData.address.townId = '';

    this.filteredTowns = [];

  }


  stateSelected(event) {

    this.singleSubscription.branchData.address.cityId = '';

    this.filteredCities = [];

    this.filteredCities.push({ value: '0', text: '', parent: '' });

    this.cities.forEach(city => {

      console.log('comparing city parent id ' + city.parent + ' with selected state id ' + this.singleSubscription.branchData.address.stateId);

      if (city.parent == this.singleSubscription.branchData.address.stateId) {

        this.filteredCities.push({ value: city.value, text: city.text, parent: city.parent });

      }

    });

    this.singleSubscription.branchData.address.townId = '';

    this.filteredTowns = [];

  }


  citySelected(event) {

    this.singleSubscription.branchData.address.townId = '';

    this.filteredTowns = [];

    this.filteredTowns.push({ value: '0', text: '', parent: '' });

    this.towns.forEach(town => {

      if (town.parent == this.singleSubscription.branchData.address.cityId) {

        this.filteredTowns.push({ value: town.value, text: town.text, parent: town.parent });

      }

    });

  }


  async getDashboardData() {

    this.startSearch = true;

    this.Dashboard = await this.subscriptionService.getDashboardData();

    this.startSearch = false;

  }


  async getDashboardData22() {

    this.startSearch = true;

    await this.subscriptionService.testPushNotification();

    this.startSearch = false;

  }


  async getBranchesSubscriptions() {

    this.startSearch2 = true;

    if (this.selectedSearch === '1') {

      this.branchesSubscriptions = await this.subscriptionService.searchSignUpFormByEmailOrPhone(this.searchValue);

    }
    else {

      this.branchesSubscriptions = await this.subscriptionService.searchSignUpFormByBranchName(this.searchValue);

    }

    console.log(this.branchesSubscriptions);

    this.startSearch2 = false;

  }


  editSignUpForm(subscription: Partial<SignUpFormDetails>) {

    this.singleSubscription = subscription;

    this.fillPlaces();

  }


  toggleActive() {

    console.log(this.singleSubscription?.branchData.active);

    console.log(this.planPricingData?.freePeriod.active);

  }


  async saveSignUpForm() {

    this.startSearch3 = true;

    await this.subscriptionService.saveSignUpDetails(this.singleSubscription);

    this.singleSubscription = null;

    this.startSearch3 = false;

    await this.getBranchesSubscriptions();

  }


  async saveAndRenew() {

    this.startSearch4 = true;

    let authToken = await this.authService.getAuthToken()

    await this.subscriptionService.saveSignUpDetails(this.singleSubscription);

    await this.subscriptionService.renewBranchSubscription(this.singleSubscription.branchData.id, this.selectedPackage, authToken);

    this.singleSubscription = null;

    this.startSearch4 = false;

    await this.getBranchesSubscriptions();

  }


  async showPopUp(popUp: MbscPopup) {

    this.planPricingData = await this.subscriptionService.getPlanPricingData();

    console.log(this.planPricingData);

    popUp.instance.show();

  }


  async savePlanPricing() {

    console.log(this.planPricingData?.freePeriod.active);

    await this.subscriptionService.savPlanPricingData(this.planPricingData);

  }


}
