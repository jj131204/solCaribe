import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  imports: [LayoutComponentComponent]
})
export class IntroductionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
