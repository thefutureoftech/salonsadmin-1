import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliateRoutingModule } from './affiliate-routing.module';
import { GeneralComponent } from './general/general.component';
import { ListComponent } from './general/list/list.component';
import { EditaffiliateComponent } from './general/editaffiliate/editaffiliate.component';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
import { AddaffiliateComponent } from './general/addaffiliate/addaffiliate.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [GeneralComponent, ListComponent, EditaffiliateComponent, DashboardComponent, AddaffiliateComponent],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    FormsModule,
    ShellModule,
    ReactiveFormsModule,
    TableModule,
    MatProgressSpinnerModule
  ]
})
export class AffiliateModule { }
