import { Component } from '@angular/core';
import { LayoutComponentComponent } from '../../../components/layout-component/layout-component.component';
import { AnualHistoricComponent } from './anualHistoric/anualHistoric.component';
import { FilterByMonthsComponent } from './filterByMonths/filterByMonths.component';
import { PredictionAIComponent } from './predictionAI/predictionAI.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-historicalReportAndPredictionOfSolarRadiation',
  templateUrl: './historicalReportAndPredictionOfSolarRadiation.component.html',
  styleUrls: ['./historicalReportAndPredictionOfSolarRadiation.component.css'],
  standalone: true,
  imports: [CommonModule, LayoutComponentComponent, AnualHistoricComponent, FilterByMonthsComponent, PredictionAIComponent]
})
export class HistoricalReportAndPredictionOfSolarRadiationComponent {
  graphicSelected = 1;
  selectedGraphic(param: number){
    this.graphicSelected = param;
  }
}
