import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtCheckGuard } from './guards/jwt-check.guard';
import { JwtReverseCheckGuard } from './guards/jwt-reverse-check.guard';

const routes: Routes = [
  { path: 'file/download', loadChildren: () => import('./pages/download-page/download-page.module').then(m => m.DownloadPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule), canActivate: [JwtReverseCheckGuard] }, 
  { path: '', loadChildren: () => import('./pages/index-page/index-page.module').then(m => m.IndexPageModule), canActivate: [JwtCheckGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
