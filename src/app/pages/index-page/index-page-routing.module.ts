import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtCheckGuard } from 'src/app/guards/jwt-check.guard';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { LoginInfoResolver } from 'src/app/resolvers/login-info.resolver';
import { UserMenuListResolver } from 'src/app/resolvers/user-menu-list.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [
      JwtCheckGuard,
    ],
    resolve: {
      UserMenuList: UserMenuListResolver,
      LoginInfo: LoginInfoResolver,
    },
    component: IndexPageComponent,
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule) 
      },
      { 
        path: 'company', 
        loadChildren: () => import('./company-page/company-page.module').then(m => m.CompanyPageModule),  
      }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
