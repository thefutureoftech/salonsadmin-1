import { Branch } from "./branch";
import { Invoice } from "./invoice";

export interface SignUpFormDetails {

  ownerName: string;
  ownerPhoneNumber: string;
  ownerEmail: string;
  active: boolean;
  branchData: Partial<Branch>;
  invoice: Partial<Invoice>;

}
