import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  constructor() { }

  @Input() color: ThemePalette;
  defaultColor: ThemePalette | undefined;

  ngOnInit(): void {
  }

}
