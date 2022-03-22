// import { Component, OnInit } from '@angular/core';
// import { SubCategory } from '../../../model/subCategory';
// import { CategoryDBService } from '../../../services/category.dbservice';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-sub-category-admin',
//   templateUrl: './sub-category-admin.component.html',
//   styleUrls: ['./sub-category-admin.component.css']
// })
// export class SubCategoryAdminComponent implements OnInit {

//   categorySelected: boolean;

//   displaySelected: boolean;

//   subCategories: any[] = [];

//   subCategoryList: SubCategory[];

//   selected: string;


//   constructor(private categoryDBService: CategoryDBService,
//     private router: Router, private activeRoute: ActivatedRoute) { }

//   ngOnInit() {

//     if (this.categoryDBService.getSelectedCategory()) {

//       this.categorySelected = true;
//     }
//     else {

//       this.categorySelected = false;

//       this.categoryDBService.setSelectedSubCategory(null);

//       return;

//     }


//     this.categoryDBService.getSubCategoriesFromDB(this.categoryDBService.getSelectedCategory().id, this.setSubCategories.bind(this));

//     if (this.categoryDBService.getSelectedSubCategory()) {

//       let id = this.categoryDBService.getSelectedSubCategory().id;

//       this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: id, type: 'SubCategory' } });

//     }


//   }


//   setSubCategories(subCategories: SubCategory[]) {

//     this.subCategoryList = subCategories;

//     this.subCategories = [];

//     this.subCategories.push({ text: '', value: '0' });

//     this.subCategoryList.forEach(subCategory => {

//       this.subCategories.push({
//         text: subCategory.name,
//         value: subCategory.id
//       });

//     });


//     if (this.categoryDBService.getSelectedSubCategory()) {

//       let selected = this.subCategoryList.find(item => {

//         return (this.categoryDBService.getSelectedSubCategory().id === item.id);

//       });

//       if (selected) {

//         this.displaySelected = true;

//         this.selected = selected.id;

//       }
//       else {

//         this.displaySelected = false;

//         this.categoryDBService.setSelectedSubCategory(null);

//       }

//     };


//   }


//   subCategorySelected(event) {

//     let selected = this.subCategoryList.find(item => {
//       return (item.name === event.valueText);
//     })

//     if (!selected) {

//       this.router.navigate(['../subcategory'], { relativeTo: this.activeRoute });

//       this.categoryDBService.setSelectedSubCategory(null);

//       this.displaySelected = false;

//     }
//     else {

//       this.categoryDBService.setSelectedSubCategory(selected.id);

//       this.displaySelected = true;

//       this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParams: { id: selected.id, type: 'SubCategory' } });

//     }

//   }


//   createNewSubCategory() {

//     this.router.navigate(['new'], { relativeTo: this.activeRoute, queryParams: { type: 'SubCategory' } });

//     this.displaySelected = true;


//   }

// }
