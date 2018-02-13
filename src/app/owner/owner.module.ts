import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerdetailsComponent } from './ownerdetails/ownerdetails.component';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
<<<<<<< HEAD
=======
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModules } from 'ng-mdb-pro';
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588


@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
<<<<<<< HEAD
    FormsModule,
=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
    ShellModule
  ],
  exports: [OwnerRoutingModule],
  declarations: [
    OwnerdetailsComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class OwnerModule { }
