import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'multimedia-manager-frontend';
  isAuthenticated:boolean;

  constructor(
  ) {}

  ngOnInit() {
    this.isAuthenticated = true;
  }
}
