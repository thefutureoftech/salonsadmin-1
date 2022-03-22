import { CategoryService } from "./categoryService";

export interface Services { 

    id: string;
    name: string;
    arabicName: string;
    imageURL: string;
    loaded: boolean;
    children: Partial<CategoryService>[];

}