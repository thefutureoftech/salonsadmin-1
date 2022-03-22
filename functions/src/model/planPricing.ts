export interface PlanPricing {

  id: string;

  freePeriod: {

    active: boolean;
    from_date: Date;
    to_date: Date;
    period: number;
    days: number

  },

  package1: {

    price: number;
    currency: string;
    period: number;
    days: number;
    affiliate_discount: number;

  },

  package2: {

    price: number;
    currency: string;
    period: number;
    days: number;
    affiliate_discount: number;

  }

}
