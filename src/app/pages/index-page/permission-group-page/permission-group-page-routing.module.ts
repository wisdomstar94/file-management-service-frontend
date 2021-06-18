import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGroupPageComponent } from './permission-group-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: PermissionGroupPageComponent, 
    children: [
      { 
        path: '', 
        loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule) 
      },
      { 
        path: 'info/:permissionGroupKey', 
        loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule) 
      },
      { 
        path: 'upload', 
        loadChildren: () => import('./upload-page/upload-page.module').then(m => m.UploadPageModule) 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionGroupPageRoutingModule { }
