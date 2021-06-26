import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionCheckGuard } from 'src/app/guards/permission-check.guard';
import { DashboardPageComponent } from './dashboard-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardPageComponent,
    canActivate: [
      PermissionCheckGuard,
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
