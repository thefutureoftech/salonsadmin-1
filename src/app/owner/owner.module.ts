import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerdetailsComponent } from './ownerdetails/ownerdetails.component';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModules } from 'ng-mdb-pro';


@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ShellModule
  ],
  exports: [OwnerRoutingModule],
  declarations: [
    OwnerdetailsComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class OwnerModule { }
