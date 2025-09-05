import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


Chart.register(...registerables);


@Component({
  selector: 'app-anualHistoric',
  templateUrl: './anualHistoric.component.html',
  styleUrls: ['./anualHistoric.component.css'],
  imports: [BaseChartDirective, CommonModule, FormsModule]
})
export class AnualHistoricComponent  implements OnInit{

  @ViewChild('chart') chart?: BaseChartDirective;
  departments: any;
  selectedDepartment: String = "";
  selectedMunicipality: String = "Seleccionar municipio";
  municipalities: any;
  selectedYear: String = "2023";

  ranges: any;

  labels: string[] = [];
  allData: number[] = [];
  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getApi('departments')
      .subscribe({
        next: (res) => {
          console.log('Respuesta:', res);
          this.departments = res;
        },
        error: (err) => {
          console.error('Error al consultar API:', err);
        }
      });
  }

  getMunicipality(): void {
    this.apiService.getApi(`municipios/${this.selectedDepartment}`)
      .subscribe({
        next: (res: any) => {
          console.log('Respuesta:', res.municipios);
          this.municipalities = res.municipios;
        },
        error: (err) => {
          console.error('Error al consultar API:', err);
        }
      });
  }

  getRange(){
    this.apiService.getApi(`municipalities/${this.selectedMunicipality}/range?start_month=enero&end_month=diciembre&year=${this.selectedYear}`)
    .subscribe({
      next: (res: any) => {
        console.log('Respuesta:', res.values);
        this.ranges = res.values;
        this.labels = this.ranges.map((d: { month: any; }) => d.month);
        this.allData = this.ranges.map((d: { value_kwh: any; }) => d.value_kwh);
        
        this.lineChartData = {
          labels: this.labels,
          datasets: [
            {
              type: 'line',
              label: 'Radiación solar en kwh/m2 * dia',
              data: this.allData,
              borderColor: 'blue',
              tension: 0.3,
            }
          ]
        };

        // Fuerza la actualización del chart
        this.chart?.update();
      },
      error: (err) => {
        console.error('Error al consultar API:', err);
      }
    });
  }


  public lineChartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      {
        type: 'line',
        label: 'Radiación solar',
        data: this.allData,
        borderColor: 'blue',
        tension: 0.3,
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
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
}
