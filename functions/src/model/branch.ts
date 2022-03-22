import * as firebase from 'firebase';
import { Hours } from './hours';
import { StoreMessage } from './message';
import { Services2 } from './services2';
import { BranchStaff } from './branchStaff';
import { Package } from './package';
import { Client } from './client';
import { ServicePrice } from './service.price';
import { CategoryService2 } from './categoryService2.service';

export class Branch {

    id: string;
    name: string;
    arabicName: string;
    storeId: string;
    address: Partial<{

        countryId: string,
        stateId: string,
        cityId: string,
        townId: string,
        blockId: string,
        buildingNumber: string,
        town_arabic_name: string;
        town_name: string;

    }>;
    schedule: Partial<Hours>[];
    location: firebase.firestore.GeoPoint;
    distance: number;
    loaded: boolean;
    offersAvailable: boolean;
    townName: string;
    townArabicName: string;
    storeLogoURL: string;
    clients: Partial<Client>[];
    logo: string;
    staff: Partial<BranchStaff>[];                //this needs to be saved as a separate collection for many to many
    services: Partial<Services2>[]; //this needs to be saved as a separate collection for many to many
    service_prices: Partial<ServicePrice>[];
    service_prices_category_services: Partial<CategoryService2>[];
    packages: Partial<Package>[];
    package_validity: { start_date: Date, end_date: Date };

    store_messages: Partial<StoreMessage>[];
    setting: {
        booking: {
            booking_hours_advance: number,
            cancel_upto_hours_advance: number,
            not_allow_staff_selection: boolean,
            not_allow_booking_overlap: boolean,
            online_policy: string,
            online_policy_arabic: string,
            branch_short_descr: string,
            branch_short_descr_arabic
        }

    };

    imageURL1: string;
    imageURL2: string;
    imageURL3: string;
    imageURL4: string;

    branchOverallAverage: number;
    branchPunctAvergae: number;
    totalAverageRating: number;
    staffRatingAveragew: number;
    servicesAverageRating: number;
    reviewsNo: number;

    active: boolean;

    constructor() {

        // this.id = 'OdAX0tFJvWZj5lBd5QuT';

        this.address = {
            countryId: '',
            stateId: '',
            cityId: '',
            townId: '',
            blockId: '',
            buildingNumber: '',
            town_name: '',
            town_arabic_name: ''
        };

        this.storeLogoURL = '';

        this.schedule = [];

        this.packages = [];

        this.service_prices = [];
        console.log('initialized service prices');
        this.location = new firebase.firestore.GeoPoint(0, 0);

        this.loaded = false;

        this.offersAvailable = false;

        this.imageURL1 = '';
        this.imageURL2 = '';
        this.imageURL3 = '';
        this.imageURL4 = '';

        this.branchOverallAverage = 0;

        this.branchPunctAvergae = 0;

        this.totalAverageRating = 0;

        this.staffRatingAveragew = 0;

        this.servicesAverageRating = 0;

        this.reviewsNo = 0;

        this.active = false;

    }

}













// import * as firebase from 'firebase';
// import { Hours } from './hours';
// import { User } from './user';
// import { Category2 } from './Category2';
// import { StoreMessage } from './message';
// import { Services2 } from './services2';
// import { BranchStaff } from './branchStaff';
// import { Package } from './package';
// import { Client } from './client';
// import { Order, ServiceItem, serviceInstance } from './booking';

// export class Branch {

//     id: string;
//     name: string;
//     arabicName: string;
//     storeId: string;
//     address: {

//         countryId: string,
//         stateId: string,
//         cityId: string,
//         townId: string,
//         blockId: string,
//         buildingNumber: string

//     };
//     schedule: Hours[];
//     location: firebase.firestore.GeoPoint;
//     staff: Partial<BranchStaff>[];                //this needs to be saved as a separate collection for many to many
//     clients: Partial<Client>[];
//     services: Partial<Services2>[]; //this needs to be saved as a separate collection for many to many
//     packages: Partial<Package>[];
//     orders: Partial<Order>[] = [];
//     serviceItems: Partial<ServiceItem>[] = [];
//     instances: Partial<serviceInstance>[] = [];

//     store_messages: Partial<StoreMessage>[];
//     setting: {
//         booking: {
//             booking_hours_advance: number,
//             cancel_upto_hours_advance: number,
//             not_allow_staff_selection: boolean,
//             not_allow_booking_overlap: boolean,
//             online_policy: string
//         },

//         calendar: {
//             time_slot_interval: string,
//             week_start_day: number
//         },

//         general: {
//             rtlSet: boolean
//         }

//     };

//     rating: number;

//     constructor() {

//         // this.id = 'OdAX0tFJvWZj5lBd5QuT';

//         this.address = {
//             countryId: '',
//             stateId: '',
//             cityId: '',
//             townId: '',
//             blockId: '',
//             buildingNumber: ''
//         };

//         this.schedule = [];

//         this.location = new firebase.firestore.GeoPoint(0, 0);

//         this.rating = 0;

//     }

// }
