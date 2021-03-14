import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    let isAuthenticated = this.browserStorageService.get('isAuthenticated');
    return isAuthenticated === 'true';
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
