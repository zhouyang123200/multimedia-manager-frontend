import { Injectable } from '@angular/core';
import { VIDEOS } from '../data/mock-videos';
import { Video } from '../models/video';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  getVideos(): Observable<Video[]> {
    return of(VIDEOS);
  }
}
