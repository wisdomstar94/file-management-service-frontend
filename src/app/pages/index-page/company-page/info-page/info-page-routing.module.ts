import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyStatusCodeResolver } from 'src/app/resolvers/company-status-code.resolver';
import { InfoPageComponent } from './info-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: InfoPageComponent,
    resolve: { 
      CompanyStatusCode: CompanyStatusCodeResolver 
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageRoutingModule { }
