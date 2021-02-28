import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private browserStorageService: BrowserStorageService) { }

  checkLogin():boolean {
    let isAuthenticated = this.browserStorageService.get('isAuthenticated');
    return isAuthenticated ? isAuthenticated === 'true' : false;
  }
}
