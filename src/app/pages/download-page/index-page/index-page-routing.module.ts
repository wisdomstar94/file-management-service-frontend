import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDownloadUrlOuterInfoResolver } from 'src/app/resolvers/file-download-url-outer-info.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    resolve: {
      FileDownloadUrlOuterInfo: FileDownloadUrlOuterInfoResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
