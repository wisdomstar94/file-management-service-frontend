import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStatusCodeResolver } from 'src/app/resolvers/user-status-code.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    resolve: {
      UserStatusCode: UserStatusCodeResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
