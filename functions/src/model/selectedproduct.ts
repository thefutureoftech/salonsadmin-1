import { ServicePrice } from './service.price';
import { Package } from './package';
import { Branch } from './branch';

export interface SelectedProduct {

    service: Partial<ServicePrice>;

    package: Partial<Package>;

    branch: Partial<Branch>;

    loaded: boolean;    //used only for UI image loading

}



export enum CartType {

    FAVORITES,

    SHOPPING_CART
    
}