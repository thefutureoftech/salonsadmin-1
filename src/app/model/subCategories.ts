import { CategoryService } from './categoryService.service';

export interface SubCategories{

    label: string;
    children: Partial<CategoryService>[];
    
}