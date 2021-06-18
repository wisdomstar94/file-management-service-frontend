import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionAllListResolver } from 'src/app/resolvers/permission-all-list.resolver';
import { PermissionGroupInfoResolver } from 'src/app/resolvers/permission-group-info.resolver';
import { PermissionGroupStatusCodeResolver } from 'src/app/resolvers/permission-group-status-code.resolver';
import { PermissionGroupUploadListResolver } from 'src/app/resolvers/permission-group-upload-list.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent,
    resolve: {
      PermissionGroupStatusCode: PermissionGroupStatusCodeResolver,
      PermissionGroupInfo: PermissionGroupInfoResolver,
      PermissionAllList: PermissionAllListResolver,
      PermissionGroupUploadList: PermissionGroupUploadListResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
