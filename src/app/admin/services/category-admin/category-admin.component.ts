import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/Category';
import { MbscSelectOptions } from '@mobiscroll/angular';
import { CategoryDBService } from '../../../services/category.dbservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {

  categories: any[] = [];

  categoryList: Category[];

  formSettings = {
    theme: 'ios'
  };

  selected: string;

  selectOptions: MbscSelectOptions = {

    theme: 'ios',
    headerText: 'Select'

  };

  constructor(private categoryDBService: CategoryDBService,
              private router: Router, private activeRoute: ActivatedRoute) {


  }

  ngOnInit() {

    this.categoryDBService.getCategoriesFromDB('salons',this.setCategories.bind(this));

    if(this.categoryDBService.getSelectedCategory()){

      let id = this.categoryDBService.getSelectedCategory().id;

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'Category' } });

    }


  }


  setCategories(categories: Category[]) {

    this.categoryList = categories;

    for(let entry in this.categories)
    {
      this.categories.pop();
    }

    this.categories.push({ text: '', value: '0' });

    this.categoryList.forEach(category => {

      this.categories.push({
        text: category.name,
        value: category.id
      });

      if(this.categoryDBService.getSelectedCategory()){

        if(this.categoryDBService.getSelectedCategory().id === category.id){

          this.selected = category.id;
          
        }

      }

    });

  }


  categorySelected(event) {

    let selected = this.categoryList.find(item => {
      return (item.name === event.valueText);
    })
  
    if(!selected){

      this.router.navigate(['../categories'], { relativeTo: this.activeRoute});

      this.categoryDBService.setSelectedCategory(null);
      
    }
    else{

      this.categoryDBService.setSelectedCategory(selected.id);

      this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'Category' } });

    }
    

  }


  createNewCategory(){

    this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'Category' } });

  }

}
