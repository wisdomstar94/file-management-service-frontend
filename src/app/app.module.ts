import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './components/alert/alert.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrf-token',
      headerName: 'csrf-token',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
