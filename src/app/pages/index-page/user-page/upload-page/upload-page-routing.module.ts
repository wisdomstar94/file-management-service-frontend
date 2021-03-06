import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { CompanyListResolver } from 'src/app/resolvers/company-list.resolver';
import { PermissionGroupListResolver } from 'src/app/resolvers/permission-group-list.resolver';
import { UserStatusCodeResolver } from 'src/app/resolvers/user-status-code.resolver';
import { UploadPageComponent } from './upload-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UploadPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: {
      UserStatusCode: UserStatusCodeResolver,
      PermissionGroupList: PermissionGroupListResolver,
      CompanyList: CompanyListResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPageRoutingModule { }
