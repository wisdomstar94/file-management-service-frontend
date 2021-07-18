import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { SearchAreaShowFlagResolver } from 'src/app/resolvers/search-area-show-flag.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: { 
      CompanyStatusCode: CompanyStatusCodeResolver, 
      SearchAreaShowFlag: SearchAreaShowFlagResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
