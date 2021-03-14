import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './browser-storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private loginUrl = 'api/authtoken/'

  constructor(
    private browserStorageService: BrowserStorageService,
    private http: HttpClient
    ) { }

  checkLogin():boolean {
    let accsess_token = this.browserStorageService.get('accsess_token');
    return accsess_token !== null;
  }

  login(username: string, passwd: string): Observable<any> {
    const userInfo = {
      username,
      passwd
    }
    return this.http.post<{access_token: string}>(this.loginUrl, userInfo).pipe(
      tap(token => this.browserStorageService.
                          set('accsess_token', token))
    );
  }
}
