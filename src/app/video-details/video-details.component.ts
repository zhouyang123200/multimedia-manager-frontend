import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {

  @Input() video:Video;

  constructor() { }

  ngOnInit() {
  }

}
