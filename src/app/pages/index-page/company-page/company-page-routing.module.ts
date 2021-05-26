import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoResolver } from 'src/app/resolvers/company-info.resolver';
import { CompanyPageComponent } from './company-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: CompanyPageComponent, 
    children: [
      // { path: 'info/:companyKey', loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule) },
      { 
        path: '', 
        loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule), 
        data: {
          animation: 'CompanyIndexPage',
        },
      },
      { 
        path: 'info/:companyKey', 
        loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule), 
        resolve: { companyInfo: CompanyInfoResolver }, 
        data: {
          animation: 'CompanyInfoPage',
        },
      },
    ]
  },
  // { path: 'info/:companyKey', loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule), resolve: { companyInfo: CompanyInfoResolver } },
  // { path: 'index', loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPageRoutingModule { }
