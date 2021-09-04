import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadPageComponent } from './download-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: DownloadPageComponent, 
    children: [
      { 
        path: 'error', 
        loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule) 
      },
      { 
        path: ':fileDownloadUrlKey', 
        loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule) 
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadPageRoutingModule { }
