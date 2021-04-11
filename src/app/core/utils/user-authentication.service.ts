import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserStorageService } from './browser-storage.service';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { sign } from 'fake-jwt-sign';
import { environment } from '../../../environments/environment';

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

export abstract class AuthService implements IAuthService {
  authStatus$: BehaviorSubject<IAuthStatus>;

  constructor(
    protected browserStorageService: BrowserStorageService,
  ) {}

  login(username: string, passwd: string): Observable<void> {
    const userInfo = {
      username,
      passwd
    };
    const loginResponse$ =  this.authProvider(username, passwd).pipe(
      map(tokenObj => tokenObj.accessToken),
      map(token => {
        this.browserStorageService.set('jwt', token);
      })
    );
    // loginResponse$.subscribe({
    //   error: (error) => {
    //     this.logout();
    //     return throwError(error);
    //   }
    // });
    return loginResponse$;
  }

  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }

  getToken(): string {
    return this.browserStorageService.get('jwt') ?? ''
  }

  protected setToken(jwt: string) {
    this.browserStorageService.set('jwt', jwt);
  }

  protected clearToken() {
    this.browserStorageService.remove('jwt');
  }

  protected abstract authProvider(username:string, passwd: string): Observable<IServerAuthResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryAuthService extends AuthService implements IAuthService {

  private loginUrl = 'api/authtoken'
  authStatus$: BehaviorSubject<IAuthStatus>;

  constructor(
    protected browserStorageService: BrowserStorageService,
    private http: HttpClient
    ) {
      super(browserStorageService);
      console.warn(
        "You're using the InMemoryAuthService. Do not use this service in production."
      )
    }

  protected authProvider(username: string, passwd: string): Observable<IServerAuthResponse> {
    const authStatus = {
      isAuthenticated: true,
      userId: 1
    } as unknown as IAuthStatus;
    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none'
      })
    } as IServerAuthResponse;
    return of(authResponse);
  }

  getToken(): string {
    throw new Error('Method not implemented.');
  }

  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService extends AuthService implements IAuthService {
  authStatus$: BehaviorSubject<IAuthStatus>;

  constructor(
    protected browserStorageService: BrowserStorageService,
    private http: HttpClient
    ) {
      super(browserStorageService);
    }

  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }

  getToken(): string {
    throw new Error('Method not implemented.');
  }

  protected authProvider(username: string, passwd: string): Observable<IServerAuthResponse> {
    return this.http.post<IServerAuthResponse>(`${environment.baseUrl}/api/authtoken`, {
      username: username,
      passwd: passwd
    })
  }

}
