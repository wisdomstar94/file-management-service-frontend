import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListResolver } from 'src/app/resolvers/company-list.resolver';
import { PermissionGroupListResolver } from 'src/app/resolvers/permission-group-list.resolver';
import { UserInfoResolver } from 'src/app/resolvers/user-info.resolver';
import { UserStatusCodeResolver } from 'src/app/resolvers/user-status-code.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent,
    resolve: {
      UserInfo: UserInfoResolver,
      UserStatusCode: UserStatusCodeResolver,
      PermissionGroupList: PermissionGroupListResolver,
      CompanyList: CompanyListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
