import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { LogYyyymmListResolver } from 'src/app/resolvers/log-yyyymm-list.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent,
    canActivate: [
      PermissionCheckGuard,
    ],
    resolve: {
      LogYyyymmList: LogYyyymmListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
