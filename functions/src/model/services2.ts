import { CategoryService2 } from './categoryService2.service';

export interface Services2 { 

    id: string;
    name: string;
    arabicName: string;
    iconName: string;
    children: Partial<CategoryService2>[];

}