import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerdetailsComponent } from './ownerdetails/ownerdetails.component';
import { OwnersearchComponent } from './ownersearch/ownersearch.component';

const routes: Routes = [
  {path: '', component: OwnerdetailsComponent},
  {path: 'ownersearch', component: OwnersearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
