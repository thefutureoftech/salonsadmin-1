export interface BookingReview {


  id: string;

  serviceId: string;

  serviceName: string;

  serviceArabicName: string;

  branchId: string;

  branchName: string;

  branchArabicName: string;

  staffId: string;

  staffName: string;

  staffArabicName: string;

  clientId: string;

  clientName: string;

  clientArabicName: string;

  userId: string;

  reviewDate: Date;

  comments: string;

  bookingId: string;

  bookingStartTime: Date;

  bookingEndTime: Date;

  status: ReviewStatus;

  branchOverallRating: number;

  branchPunctualityRating: number;

  serviceRating: number;

  staffRating: number;

}


export enum ReviewStatus {

  NEW,

  UPDATED,

  COMPLETED

}
