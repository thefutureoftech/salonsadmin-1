import { MbscModule } from '@mobiscroll/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import { AppRoutingModule } from './app-routing';
import { ShellModule } from './shell/shell.module';
import { CommonModule } from '@angular/common';
import { OwnerModule } from './owner/owner.module';
import { OwnerdetailsComponent } from './owner/ownerdetails/ownerdetails.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CrossService } from './services/cross.service';
import { UserDBService } from './services/user.dbservice';
// import { CoreModule } from './core/core.module';
import { BlockUIModule } from 'ng-block-ui';
import {NgxImageCompressService} from 'ngx-image-compress';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MbscModule,
    // CoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ShellModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot()
  ],
  providers: [AngularFirestore, NgxImageCompressService],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
