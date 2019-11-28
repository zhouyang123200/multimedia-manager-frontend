import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosComponent } from './videos/videos.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'videos', component: VideosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
