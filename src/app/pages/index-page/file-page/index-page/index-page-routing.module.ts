import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { FileStatusCodeResolver } from 'src/app/resolvers/file-status-code.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: {
      FileStatusCode: FileStatusCodeResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
