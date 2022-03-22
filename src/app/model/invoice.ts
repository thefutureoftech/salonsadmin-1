export interface Invoice {

  id: string;

  paymentDate: Date;

  amount: number;

  currency: string;

  discount: number;

  transactionId: string;

  nextPaymentDate: Date;

  branchId: string;

  affiliateId: string;

  affiliateAmount: number;

  package: string;

}
