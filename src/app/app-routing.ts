import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './shell/home/home.component';
import { LoginComponent } from './shell/login/login.component';
import { AdminGuard } from './guards/admin.guard';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule), canActivate: [AdminGuard] },
  { path: 'businessDetails', loadChildren: () => import('./business-details/business-details.module').then(m => m.BusinessDetailsModule), canActivate: [AdminGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: 'affiliate', loadChildren: () => import('./affiliate/affiliate.module').then(m => m.AffiliateModule), canActivate: [AdminGuard] },
  { path: 'subscription', loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule), canActivate: [AdminGuard] }
];


@NgModule({

  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
