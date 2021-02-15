import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoUploaderComponent } from '../video-uploader/video-uploader.component'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  private videos: Video[] = [];

  constructor(private videoService: VideoService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => {console.log(videos);this.videos = videos;})
  }

  openFormModal() {
    const modalRef = this.modalService.open(VideoUploaderComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
