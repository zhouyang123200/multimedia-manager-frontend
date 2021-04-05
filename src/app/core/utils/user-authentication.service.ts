import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserStorageService } from './browser-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators'

export interface IAuthStatus {
  isAuthenticated: boolean
  userId: string
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  login(username: string, passwd: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

export interface IServerAuthResponse {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService implements IAuthService {

  private loginUrl = 'api/authtoken'
  authStatus$: BehaviorSubject<IAuthStatus>;

  constructor(
    private browserStorageService: BrowserStorageService,
    private http: HttpClient
    ) { }

  getToken(): string {
    throw new Error('Method not implemented.');
  }

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
      map(tokenObj => tokenObj.access_token),
      tap(token => {
        this.browserStorageService.set('access_token', token);
      })
    );
  }

  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }
}
