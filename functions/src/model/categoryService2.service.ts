import { ServicePrice } from './service.price';
import { CategoryService } from './categoryService';

export interface CategoryService2{

    id: string;
    name: string;
    arabicName: string;
    parent: string;
    branch: string;
    ordering_number: number;
    prices: Partial<ServicePrice>[];
    staff: string[];  //Only contains IDs of selected staff but saved under staff_services collection
    selected: boolean;
    included: boolean;   //for UI purpose only for staff elegibility
    service_type: Partial<CategoryService>;    //treatment id

}
