import { CategoryService } from './categoryService.service';
import { SubCategories } from './subCategories';

export interface Services {

    label: string;
    children: Partial<SubCategories>[];

}