import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModules } from 'ng-mdb-pro';
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588



import { AppComponent } from './app.component';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import { AppRoutingModule } from './app-routing';
import { ShellModule } from './shell/shell.module';
import { CommonModule } from '@angular/common';
import { OwnerModule } from './owner/owner.module';
import { OwnerdetailsComponent } from './owner/ownerdetails/ownerdetails.component';
<<<<<<< HEAD
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

=======
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
<<<<<<< HEAD
    BrowserAnimationsModule,
    CommonModule,
    ShellModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
=======
    CommonModule,
    BrowserModule,
    FormsModule,
    ShellModule,
    AppRoutingModule
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
  ],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
