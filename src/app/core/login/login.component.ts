import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { UserAuthenticationService } from "@utils/user-authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: UserAuthenticationService
  ) {}

  onSubmit() {
    this.authService.login('user', 'passwd').subscribe(
      token => {
        console.log(token);
        alert(token.access_token);
      }
    )
  }

  goSignUp() {
    this.router.navigate(['/join']);
  }
}
