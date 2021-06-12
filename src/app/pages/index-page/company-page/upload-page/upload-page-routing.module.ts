import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { UploadPageComponent } from './upload-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UploadPageComponent, 
    resolve: {
      CompanyStatusCode: CompanyStatusCodeResolver, 
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPageRoutingModule { }
