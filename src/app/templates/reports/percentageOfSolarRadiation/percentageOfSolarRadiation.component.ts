import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-percentageOfSolarRadiation',
  templateUrl: './percentageOfSolarRadiation.component.html',
  styleUrls: ['./percentageOfSolarRadiation.component.css'],
  imports: [LayoutComponentComponent]
})
export class PercentageOfSolarRadiationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
