import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service'

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  video: Video;

  constructor(private route: ActivatedRoute,
              private getVideoSer: VideoService) { }

  ngOnInit() {
    this.getVideo();
  }

  getVideo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getVideoSer.getVideo(id).subscribe(video => {console.log(video);this.video = video});
  }

}
