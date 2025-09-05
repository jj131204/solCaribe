import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  imports: [LayoutComponentComponent]
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
