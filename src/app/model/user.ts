

import { mobiscroll } from '@mobiscroll/angular';

export class User {


  // email: string;
  // photoURL: string;
  // name: string;
  // gender: string;
  // emailVerified: boolean;
  // phoneNumber: string;
  // password: string;
  // uid: string;
  // createdBy: string;
  // createAt: number;
  // superAdmin: boolean;
  // owner: boolean;
  // ownerStaff: boolean;
  // assignments: [
  //   {
  //     branchId: string;
  //     roleId: string;
  //   }
  // ]

  id: string;
  email: string;
  photoURL: string;
  name: string;
  gender: string;
  emailVerified: boolean;
  phoneNumber: string;
  password: string;
  uid: string;
  enabled: boolean;
  arabicName: string;
  createdBy: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
  superAdmin: boolean;
  store_owner: boolean;
  branch_admin: boolean;
  selected: boolean;
  ownerStaff: boolean;
  services: string[];
  roles: string[];
  creationMode: string;
  affiliate: boolean;    //For UI only. Not to be saved to DB


  constructor(enabled: boolean) {

    this.email = '';
    this.photoURL = '';
    this.name = '';
    this.gender = '';
    this.emailVerified = false;
    this.phoneNumber = '';
    this.password = '';
    this.password = '';
    this.uid = '';
    this.arabicName = '';
    this.createdAt = Date.now()
    this.createdBy = '';
    this.store_owner = false;
    this.ownerStaff = false;
    this.services = [];
    this.roles = [];
    // this.workName = '';
    // this.workArabicName = '';
    // this.workPhoneNumber = '';
    // this.workEmail = '';
    this.creationMode = '';
    this.enabled = enabled;
    this.affiliate = false;


  }

}
