import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './shell/home/home.component';



const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'owner', loadChildren: './owner/owner.module#OwnerModule' }
];


@NgModule({

    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {

}