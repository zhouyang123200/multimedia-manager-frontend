import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoBoardComponent } from './video-board/video-board.component'

const routes: Routes = [
    { path: 'videos', component: VideoBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }