import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-solarRadiationReport',
  templateUrl: './solarRadiationReport.component.html',
  styleUrls: ['./solarRadiationReport.component.css'],
  imports: [LayoutComponentComponent]
})
export class SolarRadiationReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
