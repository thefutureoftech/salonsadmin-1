import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModules } from 'ng-mdb-pro';



import { AppComponent } from './app.component';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import { AppRoutingModule } from './app-routing';
import { ShellModule } from './shell/shell.module';
import { CommonModule } from '@angular/common';
import { OwnerModule } from './owner/owner.module';
import { OwnerdetailsComponent } from './owner/ownerdetails/ownerdetails.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    FormsModule,
    ShellModule,
    AppRoutingModule
  ],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
