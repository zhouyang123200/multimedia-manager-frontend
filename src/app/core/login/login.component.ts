import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from "@utils/user-authentication.service";

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
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.login('user', 'passwd').subscribe(
      // if success don't handle anything, else raise error info user
    )
  }

  goSignUp() {
    this.router.navigate(['/join']);
  }
}
