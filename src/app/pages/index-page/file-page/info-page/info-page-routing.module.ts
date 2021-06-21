import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileBasicInfoResolver } from 'src/app/resolvers/file-basic-info.resolver';
import { FileDownloadUrlConditionTypeCodeResolver } from 'src/app/resolvers/file-download-url-condition-type-code.resolver';
import { FileDownloadUrlStatusCodeResolver } from 'src/app/resolvers/file-download-url-status-code.resolver';
import { FileStatusCodeResolver } from 'src/app/resolvers/file-status-code.resolver';
import { FileVersionListResolver } from 'src/app/resolvers/file-version-list.resolver';
import { FileVersionStatusCodeResolver } from 'src/app/resolvers/file-version-status-code.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent, 
    resolve: {
      FileBasicInfo: FileBasicInfoResolver,
      FileStatusCode: FileStatusCodeResolver,
      FileVersionStatusCode: FileVersionStatusCodeResolver,
      FileDownloadUrlConditionTypeCode: FileDownloadUrlConditionTypeCodeResolver,
      FileDownloadUrlStatusCode: FileDownloadUrlStatusCodeResolver,
      FileVersionList: FileVersionListResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }