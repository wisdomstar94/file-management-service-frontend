import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { FileBasicInfoResolver } from 'src/app/resolvers/file-basic-info.resolver';
import { FileDownloadUrlConditionTypeCodeResolver } from 'src/app/resolvers/file-download-url-condition-type-code.resolver';
import { FileDownloadUrlStatusCodeResolver } from 'src/app/resolvers/file-download-url-status-code.resolver';
import { FileStatusCodeResolver } from 'src/app/resolvers/file-status-code.resolver';
import { FileVersionListResolver } from 'src/app/resolvers/file-version-list.resolver';
import { FileVersionStatusCodeResolver } from 'src/app/resolvers/file-version-status-code.resolver';
import { UserListResolver } from 'src/app/resolvers/user-list.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent,
    canActivate: [
      PermissionCheckGuard,
    ], 
    resolve: {
      FileBasicInfo: FileBasicInfoResolver,
      FileStatusCode: FileStatusCodeResolver,
      FileVersionStatusCode: FileVersionStatusCodeResolver,
      FileDownloadUrlConditionTypeCode: FileDownloadUrlConditionTypeCodeResolver,
      FileDownloadUrlStatusCode: FileDownloadUrlStatusCodeResolver,
      FileVersionList: FileVersionListResolver,
      UserList: UserListResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
