import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(file: File, url: string):Observable<any> {
    const req = new HttpRequest('POST', url,
        file.slice(), { reportProgress: true }
      );
    return this.http.request(req);
  }
}
