import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });


  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
