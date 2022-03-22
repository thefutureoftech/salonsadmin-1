import { CategoryService2 } from "./categoryService2.service";
import { Package } from './package';
import { ServicePrice } from './service.price';
import { Client } from "./client";
import { BranchStaff } from "./branchStaff";
import { Hours } from './hours';







//We need to audit trail this record only when the status changes (status of the service item or the status of
//the order itself)

export interface Order {

    id: string;

    type: string;

    client: Partial<Client>;

    services: Partial<ServiceItem>[];

    staff: Partial<BranchStaff>[];          //This is only for the UI and should NOT be saved to DB

    schedule: Hours[];                      //This is only to control the booking allowed timings and NOT to be saved to DB

    hide: boolean;                          //This is only for the UI and should NOT be saved to DB

    branch: string;

    branch_name: string;

    branch_arabicName: string;

    branch_townName: string;

    branch_townArabicName: string;

    overall_rating: number;    //Staff ID who closed the whole order

    creation_time: number;

    created_by: Partial<BranchStaff>;

    selected_date: Date;

    selected_formatted_date: string;

    closed_time: number;

    closed_by: Partial<BranchStaff>;

    booking_type: string;    //is it walk in or booked online ?

    status: number;    //recieved (auto created), under process (at least one service is confirmed),
    // closed (all items were completed only then rating sent to client)

    totalPrice: number;

    paidPrice: number;

    currency: string;

    last_updated: Date;

}


export interface ServiceItem {        //We have to save all items separately right after saving the booking

    id: string;

    order: string;

    branch: string;

    type: number;

    client: Partial<Client>;

    additional: Partial<{           //This is only for the UI control and should NOT be saved to DB

        cancel_upto_hours_advance: number,
        not_allow_staff_selection: boolean,
        not_allow_booking_overlap: boolean

    }>,

    selectedDate: Date;

    selected_formatted_date: string;

    period: number;

    price: number;

    //Only use some fields from the service interface. Also we need a snapshot of the whole service including
    //the ID as the actual service might get deleted but this snapshot should remain so we can refere to this ID from the instance
    service: Partial<CategoryService2>;

    //was this service part of a package by any chance when we added it.
    //Also we need the whole package as the original package might get deleted
    package: Partial<Package>;

    selected_service_prices: Partial<{     //we dont save this to DB but we only use it to generate the instances then we discart it immediately after that

        id: string;

        selected_service_price: Partial<ServicePrice>;

        assigned_to?: Partial<BranchStaff>;  //This is initial value for the service and could be changed in the underlying service instance

        time_from?: Date; //This is initial value for the service and could be changed in the underlying service instance

        time_to?: Date; //This is initial value for the service and could be changed in the underlying service instance

        frequency: string;

        frequency_unit: string;

        frequency_end: string;

        frequency_end_date: Date;

    }>[];

    instances: Partial<serviceInstance>[];

    lastUpdated: Date;

    status: number;

    paidPrice: number;

    modified: boolean;

}


export interface serviceInstance {

    id: string;

    order_id: string;

    serviceItem_id: string;

    branch: string;

    client_id: string;          //This was only added here to make it easier for the filter on the calendar

    user: string;

    selected_date: Date;

    selected_formatted_date: string;

    type: number;

    additional: Partial<{           //This is only for the UI control and should NOT be saved to DB

        cancel_upto_hours_advance: number,
        not_allow_staff_selection: boolean,
        not_allow_booking_overlap: boolean,
        // branch_name: string,
        // branch_arabic_name: string

    }>,

    branch_name: string,

    branch_arabic_name: string

    //Only use some fields from the service interface. Also we need a snapshot of the whole service and not o
    //the ID as the actual service might get deleted but this snapshot should remain
    service: Partial<CategoryService2>;

    //was this service part of a package by any chance when we added it.
    //Also we need the whole package as the original package might get deleted
    package: Partial<Package>;

    servicePrice: Partial<ServicePrice>;  //The generated service price associated with the selected servie or selected package from above

    selectedServicePrice: Partial<ServicePrice>;

    lastUpdated: Date;

    time_from?: Date;

    time_to?: Date;

    confirmed_by: Partial<BranchStaff>,

    confirmed_time?: Date;

    assigned_by?: Partial<BranchStaff>;

    assigned_to?: Partial<BranchStaff>;

    assigned_time?: Date;

    completed_by?: Partial<BranchStaff>;

    completed_time?: Date;

    status: number;

    service_rating: number;

    amountPaid: number;

    booking_id: number;

    modified: boolean;

    reminder24HoursSent: boolean;

    reminder1HourSent: boolean;

}


export interface note {


    id: number;

    type: string;  //client or store

    sender: string;

    recepient: string;

    sent_on: number;

    content: string;

    new_flag: boolean;
}

export interface KeyObject {

    key: number,
    rtl: boolean;
};

export enum BookingEnums {

    WALKIN,
    ONLINE

}

export const BookingTypes = new Map<KeyObject, string>([
    [{ key: BookingEnums.WALKIN, rtl: false }, 'Call-In'],
    [{ key: BookingEnums.WALKIN, rtl: true }, 'حجز داخلي'],
    [{ key: BookingEnums.ONLINE, rtl: false }, 'Online Booking'],
    [{ key: BookingEnums.ONLINE, rtl: true }, 'حجز بالتطبيق'],
]);


export enum serviceInstanceStatus {

    NEW,
    UNASSIGNED,
    CONFIRMED,
    ASSIGNED,
    STARTED,
    COMPLETED,
    NO_SHOW,
    CANCELED,

}

export const InstanceStatusNames = new Map<Partial<KeyObject>, string>([
    [{ key: serviceInstanceStatus.NEW, rtl: false }, 'Pending'],
    [{ key: serviceInstanceStatus.NEW, rtl: true }, 'قيد المعاينه'],
    [{ key: serviceInstanceStatus.UNASSIGNED, rtl: false }, 'Not Assigned'],
    [{ key: serviceInstanceStatus.UNASSIGNED, rtl: true }, 'موعد بدون موظف'],
    [{ key: serviceInstanceStatus.CONFIRMED, rtl: false }, 'Confirmed'],
    [{ key: serviceInstanceStatus.CONFIRMED, rtl: true }, 'موعد مؤكد'],
    [{ key: serviceInstanceStatus.ASSIGNED, rtl: false }, 'Assigned'],
    [{ key: serviceInstanceStatus.ASSIGNED, rtl: true }, 'موعد بموظف'],
    [{ key: serviceInstanceStatus.STARTED, rtl: false }, 'In Progress'],
    [{ key: serviceInstanceStatus.STARTED, rtl: true }, 'موعد جاري العمل'],
    [{ key: serviceInstanceStatus.COMPLETED, rtl: false }, 'Completed'],
    [{ key: serviceInstanceStatus.COMPLETED, rtl: true }, 'موعد مكتمل'],
    [{ key: serviceInstanceStatus.NO_SHOW, rtl: false }, 'No Show'],
    [{ key: serviceInstanceStatus.NO_SHOW, rtl: true }, 'عدم حضور'],
    [{ key: serviceInstanceStatus.CANCELED, rtl: false }, 'Canceled'],
    [{ key: serviceInstanceStatus.CANCELED, rtl: true }, 'ملغى']
]);


export enum ServiceItemStatus {

    NEW,
    CONFIRMED,
    IN_PROGRESS,
    COMPLETED,

}

export const ServiceItemStatusNames = new Map<KeyObject, string>([
    [{ key: ServiceItemStatus.NEW, rtl: false }, 'New'],
    [{ key: ServiceItemStatus.NEW, rtl: true }, 'جديد'],
    [{ key: ServiceItemStatus.CONFIRMED, rtl: false }, 'Confirmed'],
    [{ key: ServiceItemStatus.CONFIRMED, rtl: true }, 'مؤكد'],
    [{ key: ServiceItemStatus.IN_PROGRESS, rtl: false }, 'In Progress'],
    [{ key: ServiceItemStatus.IN_PROGRESS, rtl: true }, 'جاري العمل'],
    [{ key: ServiceItemStatus.COMPLETED, rtl: false }, 'Completed'],
    [{ key: ServiceItemStatus.COMPLETED, rtl: true }, 'مكتمل']
]);


export enum OrderStatus {

    PENDING,
    CONFIRMED,
    PARTIALLY_CONFIRMED,
    IN_PROGRESS,
    COMPLETED

}


export const OrderStatusNames = new Map<KeyObject, string>([
    [{ key: OrderStatus.PENDING, rtl: false }, 'Pending'],
    [{ key: OrderStatus.PENDING, rtl: true }, 'في الإنتظار'],
    [{ key: OrderStatus.CONFIRMED, rtl: false }, 'Confirmed'],
    [{ key: OrderStatus.CONFIRMED, rtl: true }, 'مؤكد'],
    [{ key: OrderStatus.PARTIALLY_CONFIRMED, rtl: false }, 'Partially Confirmed'],
    [{ key: OrderStatus.PARTIALLY_CONFIRMED, rtl: true }, 'شبه مؤكد'],
    [{ key: OrderStatus.IN_PROGRESS, rtl: false }, 'In Progress'],
    [{ key: OrderStatus.IN_PROGRESS, rtl: true }, 'جاري العمل'],
    [{ key: OrderStatus.COMPLETED, rtl: false }, 'Completed'],
    [{ key: OrderStatus.COMPLETED, rtl: true }, 'مكتمل']

]);

