import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '../translate/translate.service';
import { TRANSLATION_PROVIDERS } from '../translate/translation';
import { TranslatePipe } from '../translate/translate.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';




@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        TranslatePipe,
        LoginComponent
    ],
    imports: [
        CommonModule,
        MbscModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule

        // ProgressSpinnerModule,
        // PanelModule,
        // BlockUIModule,
        // ButtonModule,
        // FileUploadModule,
        // TableModule,
        // CheckboxModule,
        // TriStateCheckboxModule,
        // ToggleButtonModule,
        // TreeModule

    ],
    exports: [
        NavbarComponent, TranslatePipe, MbscModule, MatButtonModule, MatIconModule
        // ScheduleModule,
        // ProgressSpinnerModule, PanelModule, BlockUIModule,
        // ButtonModule, FileUploadModule, TableModule, CheckboxModule,
        // TriStateCheckboxModule, ToggleButtonModule, TreeModule
    ],
    providers: [TRANSLATION_PROVIDERS, TranslateService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ShellModule { }
