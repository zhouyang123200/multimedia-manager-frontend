import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoBoardComponent } from './video-board/video-board.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosControllerComponent } from './videos-controller/videos-controller.component'



@NgModule({
  declarations: [VideoListComponent, VideoBoardComponent, VideosControllerComponent],
  imports: [
    MatCardModule,
    MatGridListModule,
    CommonModule,
    VideosRoutingModule
  ],
  exports: [VideoBoardComponent]
})
export class VideosModule { }
