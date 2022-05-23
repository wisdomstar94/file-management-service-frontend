import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './components/alert/alert.module';
import { StoreModule } from '@ngrx/store'
import { destinationReducer } from './store/destination/destination.reducer';
import { deviceModeReducer } from './store/device-mode/device-mode.reducer';
import { commonNavisNavOpenedReducer } from './store/common-nav/common-nav-opend.reducer';
import { appTitleReducer } from './store/app-title/app-title.reducer';
import { commonNavModeReducer } from './store/common-nav/common-nav-mode.reducer';
import { commonNavWidthReducer } from './store/common-nav/common-nav-width.reducer';
import { menuActiveReducer } from './store/menu/menu-active.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'CSRF-TOKEN',
      headerName: 'csrf-token',
    }),
    StoreModule.forRoot({
      navOpend: commonNavisNavOpenedReducer,
      navMode: commonNavModeReducer,
      navWidth: commonNavWidthReducer,
      deviceMode: deviceModeReducer,
      destination: destinationReducer,
      appTitle: appTitleReducer,
      activeMenuKey: menuActiveReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
