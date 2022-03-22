export interface AffiliatedUser {

  id: string;

  userId: string;

  userName: string;

  userArabicName: string;

  lastPaymentDate: Date;

  lastUpdated: Date;

  readyToPayAmount: number;

  totalPaidAmount: number;

  currency: string;

  active: boolean;

  isRequesting: boolean;

  requestDate: Date;

  phoneNumber: string;        //Only from UI. Not to be saved to DB. Read from users collection

  BankName: string;

  accountNumber: number;

  lastWithrawRequestDate: Date;

  earning: number;            //Only from UI. Not to be saved to DB. Read from users collection

}
