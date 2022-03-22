export interface ServicePrice {

    id: string;

    branch: string;

    service: string;

    period: number;

    unit: string;

    name: string;

    arabicName: string;

    included: boolean;

    price: number;

    currency: string;

    ordering_number: number;

    priceImageURL: string;

    loaded: boolean;     //Only for UI image spinner loading

    description: string;

    description_arabic: string;

    rating: number;

}
