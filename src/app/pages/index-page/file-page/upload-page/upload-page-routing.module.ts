import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { FileStatusCodeResolver } from 'src/app/resolvers/file-status-code.resolver';
import { FileVersionStatusCodeResolver } from 'src/app/resolvers/file-version-status-code.resolver';
import { UploadPageComponent } from './upload-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UploadPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: {
      FileStatusCode: FileStatusCodeResolver,
      FileVersionStatusCode: FileVersionStatusCodeResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPageRoutingModule { }
