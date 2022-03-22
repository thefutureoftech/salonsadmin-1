import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateResolver } from '../guards/affiliate.resolver';
import { AddaffiliateComponent } from './general/addaffiliate/addaffiliate.component';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { EditaffiliateComponent } from './general/editaffiliate/editaffiliate.component';
import { GeneralComponent } from './general/general.component';
import { ListComponent } from './general/list/list.component';


const routes: Routes = [

  {
    path: '', component: GeneralComponent, children: [

      { path: 'list/:type', component: ListComponent, resolve: {data: AffiliateResolver} },

      { path: 'editaffiliate/:id/:type', component: EditaffiliateComponent, resolve: {data: AffiliateResolver} },

      { path: 'addaffiliate', component: AddaffiliateComponent },

      { path: 'dashboard', component: DashboardComponent }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliateRoutingModule { }
