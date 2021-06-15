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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionGroupPageRoutingModule { }
