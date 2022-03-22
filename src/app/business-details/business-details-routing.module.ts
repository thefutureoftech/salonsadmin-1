import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailsComponent } from './categories-details/categories-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FinalComponent } from './final/final.component';


const routes: Routes = [
  { path: '', component: BusinessDetailsComponent, pathMatch: 'full' },
  { path: 'hours', component: BusinessHoursComponent },
  {
    path: 'services', component: CategoriesComponent, children: [
      { path: 'serviceDetails', component: CategoriesDetailsComponent }
    ]
  },
  {path: 'employees', component: UserListComponent, children: [
    { path: 'employee', component: UserDetailComponent }
  ]},
  {path: 'final', component: FinalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDetailsRoutingModule { }
