import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import {ScheduleModule} from 'primeng/schedule';

import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../translate/translate.service';
import { TRANSLATION_PROVIDERS } from '../translate/translation';
import { TranslatePipe } from '../translate/translate.pipe';
import { UserDBService } from '../services/user.dbservice';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {PanelModule} from 'primeng/panel';
import {BlockUIModule} from 'primeng/blockui';


@NgModule({
    declarations: [
      HomeComponent,
      NavbarComponent,
      TranslatePipe
    ],
    imports: [
      CommonModule,
      MbscModule,
      HttpClientModule,
      ScheduleModule,
      FormsModule,
      ProgressSpinnerModule,
      PanelModule,
      BlockUIModule

    ],
    exports: [
        NavbarComponent, TranslatePipe, MbscModule, ProgressSpinnerModule, PanelModule, BlockUIModule
    ],
    providers: [TRANSLATION_PROVIDERS, TranslateService, UserDBService],
    schemas: [ NO_ERRORS_SCHEMA ]
  })
  export class ShellModule {}