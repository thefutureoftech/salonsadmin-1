import * as firebase from 'firebase';
import { Hours } from './hours';
import { BranchStaff } from './branchstaff';


export class Branch {

    id: string;
    name: string;
    arabicName: string;
    storeId: string;
    storeLogoURL: string;
    address: {

        countryId: string,
        stateId: string,
        cityId: string,
        townId: string,
        blockId: string,
        buildingNumber: string

    };
    schedule: Partial<Hours>[];
    location: firebase.firestore.GeoPoint;
    staff: Partial<BranchStaff>[];                //this needs to be saved as a separate collection for many to many
    // clients: Partial<Client>[];                 //This will only be assigned in the admin interfac e for now
    // services: Partial<Services2>[];                 //This will only be assigned in the admin interfac e for now
    // packages: Partial<Package>[];
    // orders: Partial<Order>[] = [];
    // serviceItems: Partial<ServiceItem>[] = [];
    // instances: Partial<serviceInstance>[] = [];

    // store_messages: Partial<StoreMessage>[];
    setting: {
        booking: {
            booking_hours_advance: number,
            cancel_upto_hours_advance: number,
            allow_staff_selection: boolean,
            allow_booking_overlap: boolean,
            online_policy: string
        },

        calendar: {
            time_slot_interval: string,
            week_start_day: number
        },

        general: {
            rtlSet: boolean
        }

    };

    rating: number;

    overallRating: number;
    punctualityRating: number;

    active: boolean;
    sentExpiryWarning: boolean;

    subscription_package: string;

    constructor() {

        // this.id = 'OdAX0tFJvWZj5lBd5QuT';

        this.address = {
            countryId: '',
            stateId: '',
            cityId: '',
            townId: '',
            blockId: '',
            buildingNumber: ''
        };

        this.schedule = [];

        this.location = new firebase.firestore.GeoPoint(0, 0);

        this.rating = 0;

        this.overallRating = 0;

        this.punctualityRating = 0;

        this.active = false;

        this.sentExpiryWarning = false;

        this.subscription_package = '';

    }

}
