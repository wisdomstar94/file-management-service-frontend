import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileBasicInfoResolver } from 'src/app/resolvers/file-basic-info.resolver';
import { FileStatusCodeResolver } from 'src/app/resolvers/file-status-code.resolver';
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
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
