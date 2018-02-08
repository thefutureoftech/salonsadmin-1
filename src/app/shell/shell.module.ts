import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModules } from 'ng-mdb-pro';
import { TranslateService } from '../translate/translate.service';
import { TRANSLATION_PROVIDERS } from '../translate/translation';
import { TranslatePipe } from '../translate/translate.pipe';


@NgModule({
    declarations: [
      HomeComponent,
      NavbarComponent,
      TranslatePipe
    ],
    imports: [
      CommonModule,
      MDBBootstrapModules.forRoot(),
      MbscModule
    ],
    exports: [
        NavbarComponent, TranslatePipe, MDBBootstrapModules, MbscModule
    ],
    providers: [TRANSLATION_PROVIDERS, TranslateService],
    schemas: [ NO_ERRORS_SCHEMA ]
  })
  export class ShellModule {}