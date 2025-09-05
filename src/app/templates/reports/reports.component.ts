import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [LayoutComponentComponent]
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
