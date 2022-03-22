import { ServicePrice } from "./service.price";


export interface Package {

    id: string;

    branch: string;

    name: string;

    arabicName: string;

    selected: boolean;

    // services: string[];   //pointing to ServicePrice array (with many to many)

    services: Partial<{ service: string, times: number, name: string, arabicName: string }>[];

    service_prices: Partial<ServicePrice>[];

    originalTotal: number;

    discountedTotal: number;

    currency: string;

    start_date: Date;

    end_date: Date;

    last_updated: number;

    description: string

    description_arabic: string;

}
