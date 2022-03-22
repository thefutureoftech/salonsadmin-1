

export class User {

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
  workName: string;
  workArabicName: string;
  workEmail: string;
  workPhoneNumber: string;
  creationMode: string;
  rtlSet: boolean;

  // mobiscroll.util.datetime.formatDate('yy-mm-dd HH:ii:ss', new Date());
  constructor(enabled: boolean) {

    console.log('user constructor');

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
    this.workName = '';
    this.workArabicName = '';
    this.workPhoneNumber = '';
    this.workEmail = '';
    this.creationMode = '';
    this.enabled = enabled;
    this.rtlSet = true;


  }

}
