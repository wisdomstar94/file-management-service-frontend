import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserPageComponent,
    children: [
      { 
        path: '', 
        loadChildren: () => import('./index-page/index-page.module').then(m => m.IndexPageModule) 
      },
      { 
        path: 'info/:userKey', 
        loadChildren: () => import('./info-page/info-page.module').then(m => m.InfoPageModule) 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
