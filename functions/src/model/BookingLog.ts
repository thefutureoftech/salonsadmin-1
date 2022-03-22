import { serviceInstanceStatus } from "./booking";

export interface BookingLog {

  id: string;

  bookingId: string;

  bookingItemId: string;

  bookingOrderId: string;

  bookingBranchId: string;

  clientId: string;

  staffId: string;

  staffName: string;

  staffArabicName: string;

  bookingStatus: number;

  bookingStatusName: string;

  bookingStatusArabicName: string;

  bookingStatusDate: Date;

  bookingNewStatus: serviceInstanceStatus;

  bookingNewStatusName: string;

  bookingNewStatusArabicName: string;

  bookingNewStatusDate: Date;

  paymentType: PaymentType;

  paymentDate: Date;

  paymentAmount: number;

  paymentCurrency: string;

  servicePrice: string;

  servicePriceName: string;

  servicePriceArabicName: string;

  packageId: string;

  packageName: string;

  packageArabicName: string;

  productType: ProductType


}


export enum PaymentType {

  CREDIT,

  DEBIT

}


export enum ProductType {

  SERVICE,

  PACKAGE

}
