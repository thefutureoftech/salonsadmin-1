import { AffiliatedUser } from './affiliatedUser';

export interface AffiliateDashboard {


  tottalPaid: number;

  totalRedaToPay: number;

  totalCommission: number;

  topAffiliates: Partial<AffiliatedUser>[];

}
