import { Component } from '@angular/core';
import { UserAuthenticationService } from './core/utils/user-authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'multimedia-manager-frontend';
  isAuthenticated:boolean = false;

  constructor(
    private userAuthService: UserAuthenticationService,
    private router:Router
    ) {}

  ngOnInit() {
    // this.isAuthenticated = this.userAuthService.checkLogin();
    this.isAuthenticated = true;
    console.log(`isAuth: ${this.isAuthenticated}`);
    if (!this.isAuthenticated)
      this.router.navigate(['/login']);
  }
}
