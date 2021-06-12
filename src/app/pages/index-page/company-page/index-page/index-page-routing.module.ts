import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { IndexPageComponent } from './index-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexPageComponent, 
    resolve: { 
      CompanyStatusCode: CompanyStatusCodeResolver 
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
