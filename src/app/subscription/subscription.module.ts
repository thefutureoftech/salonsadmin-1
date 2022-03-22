import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellModule } from '../shell/shell.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    FormsModule,
    ShellModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TableModule,
    ButtonModule,
    MatButtonModule
  ]
})
export class SubscriptionModule { }
