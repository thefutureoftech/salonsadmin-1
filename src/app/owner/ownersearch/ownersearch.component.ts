import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MbscFormOptions } from '@mobiscroll/angular';
import { StoreService } from '../../services/store.service';
import { UserDBService } from '../../services/user.dbservice';

@Component({
  selector: 'app-ownersearch',
  templateUrl: './ownersearch.component.html',
  styleUrls: ['./ownersearch.component.css']
})
export class OwnersearchComponent implements OnInit {

  formSettings: MbscFormOptions;

  startSearch: boolean;

  showResult: boolean;

  ownerExist: boolean;

  startGoing: boolean;

  email: string;

  resultString: string;

  storeId: string;

  constructor(private userdbService: UserDBService, private router: Router, private activeRoute: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit(): void {

    this.init();

  }

  init() {

    this.formSettings = {
      theme: 'ios',
      lang: 'en',
      inputStyle: 'outline',
      labelStyle: 'stacked'
    };

  }


  proceed() {

    this.startGoing = true;

    this.router.navigate(['../../businessDetails'], { relativeTo: this.activeRoute, queryParams: { storeId: this.storeId } }).then(result => { this.startGoing = false; })


  }


  async search(event) {



    if ((<string>event.target.value).trim() === '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(<string>event.target.value))) {

      this.showResult = false;

      this.ownerExist = false;

      return;

    }

    this.startSearch = true;

    this.showResult = false;

    // this.returnedData = await this.clientService.searchClientByPhoneNumber(event.target.value);

    this.email = event.target.value;

    let result = await this.userdbService.checkIfAlreadyOwner(this.email).toPromise();

    console.log(result);

    if (result && result.result) {

      this.storeId = result.storeData.id;

      this.storeService.setStore(result.storeData);

      this.ownerExist = true;

      this.resultString = 'Owner Found';

    }
    else {

      this.storeService.setStore(null);

      this.ownerExist = false;

      this.resultString = 'Owner Not Found';

    }


    this.startSearch = false;

    this.showResult = true;




  }


}
