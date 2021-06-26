import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: { 
      CompanyStatusCode: CompanyStatusCodeResolver 
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
