export interface BranchStaff {

  id: string;

  branch: string;

  user: string;

  workName: string;

  workArabicName: string;

  workPhoneNumber: string;

  workEmail: string;

  phoneNumber: string;    //only saved against new User record

  email: string; //only saved against new User record

  password: string; //only saved against new User record

  name: string; //only saved against new User record

  roles: string[];

  createdAt: Date,

  updatedAt: Date,

  // services: Partial<CategoryService2>[];   //This will only be assigned in the admin interface for now

  selected2: boolean;  //for UI display pupose only

  isRTL: boolean;

  theme: string;

  ratings: Partial<{ branch: string, rating: number }>[];

}
