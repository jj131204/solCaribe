import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-problematic',
  templateUrl: './problematic.component.html',
  styleUrls: ['./problematic.component.css'],
  imports: [LayoutComponentComponent]
})
export class ProblematicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
