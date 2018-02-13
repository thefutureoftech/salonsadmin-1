import { Data } from "@angular/router/src/config";

export class User {
    

     email: string;
     photoURL: string;
     name: string;
     gender: string;
     emailVerified: boolean;
     phoneNumber: string;
     password: string;
     uid: string;
     createdBy: string;
     createAt: Data;


    constructor( enabled: boolean,  createdBy: string) {


    }



  }