import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'multimedia-manager-frontend';
  private currentContent:string = 'dashboard';

  constructor(
  ) {}

  ngOnInit() {
    this.currentContent = 'dashboard';
  }

  onSelecteContent(content: string):void {
    this.currentContent = content;
  }
}
