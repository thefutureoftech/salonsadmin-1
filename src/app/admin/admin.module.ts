import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateAdminComponent } from './state-admin/state-admin.component';
import { AdminRoutingModule } from './admin.routing';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CountryAdminComponent } from './country-admin/country-admin.component';
import { CityAdminComponent } from './city-admin/city-admin.component';
import { TownAdminComponent } from './town-admin/town-admin.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { CategoryAdminComponent } from './services/category-admin/category-admin.component';
import { ServiceEditComponent } from './services/service-edit/service-edit.component';
import { ServiceAdminComponent } from './services/service-admin2/service-admin.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,
    ShellModule
  ],
  declarations: [StateAdminComponent, HeaderAdminComponent, CountryAdminComponent,
                CityAdminComponent, TownAdminComponent, PlaceEditComponent, CategoryAdminComponent, ServiceAdminComponent, ServiceEditComponent]
})
export class AdminModule { }