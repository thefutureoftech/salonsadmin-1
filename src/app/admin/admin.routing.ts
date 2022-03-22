import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateAdminComponent } from './state-admin/state-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CountryAdminComponent } from './country-admin/country-admin.component';
import { CityAdminComponent } from './city-admin/city-admin.component';
import { TownAdminComponent } from './town-admin/town-admin.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { CategoryAdminComponent } from './services/category-admin/category-admin.component';
import { ServiceEditComponent } from './services/service-edit/service-edit.component';
import { ServiceAdminComponent } from './services/service-admin2/service-admin.component';




const routes: Routes = [
    {
        path: '', component: HeaderAdminComponent, children: [

            {
                path: 'countries', component: CountryAdminComponent, children: [
                    { path: 'edit', component: PlaceEditComponent },
                    { path: 'new', component: PlaceEditComponent }
                ]
            },
            {
                path: 'states', component: StateAdminComponent, children: [
                    { path: 'edit', component: PlaceEditComponent },
                    { path: 'new', component: PlaceEditComponent }
                ]
            },
            {
                path: 'cities', component: CityAdminComponent, children: [
                    { path: 'edit', component: PlaceEditComponent },
                    { path: 'new', component: PlaceEditComponent }
                ]
            },
            {
                path: 'towns', component: TownAdminComponent, children: [
                    { path: 'edit', component: PlaceEditComponent },
                    { path: 'new', component: PlaceEditComponent }
                ]
            },


        ]
    },

    {
        path: 'services', component: HeaderAdminComponent, children: [
            {
                path: 'category', component: CategoryAdminComponent, children: [
                    { path: 'edit', component: ServiceEditComponent },
                    { path: 'new', component: ServiceEditComponent }
                ]
            },
            // {
            //     path: 'subcategory', component: SubCategoryAdminComponent, children: [
            //         { path: 'edit', component: ServiceEditComponent },
            //         { path: 'new', component: ServiceEditComponent }
            //     ]
            // },
            {
                path: 'service', component: ServiceAdminComponent, children: [
                    { path: 'edit', component: ServiceEditComponent },
                    { path: 'new', component: ServiceEditComponent }
                ]
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }