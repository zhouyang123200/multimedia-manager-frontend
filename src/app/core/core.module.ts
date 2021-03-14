import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosModule } from '../videos/videos.module'
import { DataService } from './utils/data.service'


const routes: Routes = [];

@NgModule({
  declarations: [LoginComponent, SignUpComponent, NavHeaderComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    VideosModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [],
  exports: [NavHeaderComponent, LoginComponent, SignUpComponent, DashboardComponent, RouterModule]
})
export class CoreModule { }
