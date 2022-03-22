import { CategoryService2 } from './categoryService2.service';
import { serviceInstance } from './booking';

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

    services: Partial<CategoryService2>[];

    selected2: boolean;  //for UI display pupose only

    isRTL: boolean;

    theme: string;

    instances: Partial<serviceInstance>[];

    ratings: Partial<{ branch: string, rating: number }>[];

}
