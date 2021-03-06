import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePageComponent } from './file-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: FilePageComponent, 
    children: [
      { 
        path: '', 
        loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule) 
      },
      { 
        path: 'info/:fileKey', 
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
export class FilePageRoutingModule { }
