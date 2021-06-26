import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { CompanyInfoResolver } from 'src/app/resolvers/company-info.resolver';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent,
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: { 
      companyInfo: CompanyInfoResolver,
      CompanyStatusCode: CompanyStatusCodeResolver 
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
