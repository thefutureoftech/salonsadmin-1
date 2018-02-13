import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerdetailsComponent } from './ownerdetails/ownerdetails.component';

const routes: Routes = [
  {path: '', component: OwnerdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
