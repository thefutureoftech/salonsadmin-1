import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerdetailsComponent } from './ownerdetails/ownerdetails.component';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
// import { BrowserModule } from '@angular/platform-browser';
import { CrossService } from '../services/cross.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwnersearchComponent } from './ownersearch/ownersearch.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OwnerRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    ShellModule
  ],
  exports: [OwnerRoutingModule],
  declarations: [
    OwnerdetailsComponent,
    OwnersearchComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class OwnerModule { }
