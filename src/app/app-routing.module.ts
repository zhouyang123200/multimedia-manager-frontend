import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { SignUpComponent } from './core/sign-up/sign-up.component'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { VideoListComponent } from './videos/video-list/video-list.component';
// import { VideoDetailsComponent } from './video-details/video-details.component'


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'join', component: SignUpComponent},
  { path: 'home', component: DashboardComponent },
  { path: 'videos', component: VideoListComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // { path: 'video/:id', component: VideoDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
