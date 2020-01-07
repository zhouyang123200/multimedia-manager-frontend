import { Injectable } from '@angular/core';
import { VIDEOS } from '../data/mock-videos';
import { Video } from '../models/video';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    const url = '/api/videos'
    const req = new HttpRequest('GET', url);
    return this.http.get<Video[]>(url)
  }

  getVideo(id: number): Observable<Video> {
    const url = `/api/video/${id}`
    const req = new HttpRequest('GET', url);
    return this.http.get<Video>(url)
  }
}
