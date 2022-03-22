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

  isRequesting: boolean;

  requestDate: Date;

  active: boolean;

  BankName: string;

  accountNumber: number;

  lastWithrawRequestDate: Date;

}
