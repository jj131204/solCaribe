import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css'],
  imports: [CommonModule]
})
export class LayoutComponentComponent implements OnInit {

  open = false;
  openReports = false;

  constructor() { }

  ngOnInit() {
  }

  openMenu(){
    this.open = !this.open;
  }

  opensubmenu(){
    this.openReports = !this.openReports;
  }
}
