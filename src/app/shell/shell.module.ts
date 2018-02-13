import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
<<<<<<< HEAD
import {HttpClientModule} from '@angular/common/http';
=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

<<<<<<< HEAD
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
=======
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModules } from 'ng-mdb-pro';
import { TranslateService } from '../translate/translate.service';
import { TRANSLATION_PROVIDERS } from '../translate/translation';
import { TranslatePipe } from '../translate/translate.pipe';
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588


@NgModule({
    declarations: [
      HomeComponent,
      NavbarComponent,
      TranslatePipe
    ],
    imports: [
      CommonModule,
<<<<<<< HEAD
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
=======
      MDBBootstrapModules.forRoot(),
      MbscModule
    ],
    exports: [
        NavbarComponent, TranslatePipe, MDBBootstrapModules, MbscModule
    ],
    providers: [TRANSLATION_PROVIDERS, TranslateService],
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
    schemas: [ NO_ERRORS_SCHEMA ]
  })
  export class ShellModule {}