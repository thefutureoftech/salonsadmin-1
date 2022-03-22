import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailsRoutingModule } from './business-details-routing.module';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesDetailsComponent } from './categories-details/categories-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  imports: [
    CommonModule,
    BusinessDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ShellModule
  ],
  declarations: [BusinessDetailsComponent, BusinessHoursComponent, CategoriesComponent, CategoriesDetailsComponent, UserListComponent, UserDetailComponent, FinalComponent]
})
export class BusinessDetailsModule { }
