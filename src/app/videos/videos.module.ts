import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoBoardComponent } from './video-board/video-board.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosControllerComponent } from './videos-controller/videos-controller.component'



@NgModule({
  declarations: [VideoListComponent, VideoBoardComponent, VideosControllerComponent],
  imports: [
    CommonModule,
    VideosRoutingModule
  ],
  exports: [VideoBoardComponent]
})
export class VideosModule { }
