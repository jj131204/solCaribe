import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


Chart.register(...registerables);

@Component({
  selector: 'app-anualHistoric',
  templateUrl: './anualHistoric.component.html',
  styleUrls: ['./anualHistoric.component.css'],
  imports: [BaseChartDirective]
})
export class AnualHistoricComponent {
  allData = [10, 20, 15, 30, 25, 28, 30, 50];
  labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  cutIndex = 4; // a partir de Mayo son estimados

  public lineChartData: ChartData<'line'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'julio'],
    datasets: [
      {
        type: 'line',
        label: 'Radiación solar',
        data: this.allData,
        borderColor: 'blue',
        tension: 0.3,
        segment: {
          borderColor: ctx => ctx.p0.parsed.x < this.cutIndex ? 'blue' : 'orange',
          borderDash: ctx => ctx.p0.parsed.x < this.cutIndex ? [] : [5, 5],
        }
      }
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
}
