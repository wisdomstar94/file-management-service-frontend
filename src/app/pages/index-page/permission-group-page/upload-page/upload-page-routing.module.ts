import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { PermissionAllListResolver } from 'src/app/resolvers/permission-all-list.resolver';
import { PermissionGroupStatusCodeResolver } from 'src/app/resolvers/permission-group-status-code.resolver';
import { UploadPageComponent } from './upload-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UploadPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: {
      PermissionGroupStatusCode: PermissionGroupStatusCodeResolver,
      // PermissionGroupInfo: PermissionGroupInfoResolver,
      PermissionAllList: PermissionAllListResolver,
      // PermissionGroupUploadList: PermissionGroupUploadListResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPageRoutingModule { }
