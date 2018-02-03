import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe 
  ],
  imports: [
    BrowserModule
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
