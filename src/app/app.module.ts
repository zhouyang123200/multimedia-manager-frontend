import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module'
import { authFactory, AuthService } from '@utils/user-authentication.service'
import { BrowserStorageService } from '@utils/browser-storage.service';
// add angular video module

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    CoreModule
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [BrowserStorageService, HttpClient]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
