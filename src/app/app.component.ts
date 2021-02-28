import { Component } from '@angular/core';
import { UserAuthenticationService } from './core/utils/user-authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'multimedia-manager-frontend';
  isAuthenticated:boolean = false;

  constructor(private userAuthService: UserAuthenticationService) {}

  ngOnInit() {
    this.isAuthenticated = this.userAuthService.checkLogin();
    console.log(this.isAuthenticated);
  }
}
