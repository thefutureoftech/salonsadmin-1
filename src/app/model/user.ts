<<<<<<< HEAD
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



=======
export class User {
    
    uid: string;
    email: string;
    photoURL: string;
    name: string;
    gender: string;
    emailVerified: boolean;
    phoneNumber: string;
    enabled: boolean;

    constructor() {

    }

>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
  }