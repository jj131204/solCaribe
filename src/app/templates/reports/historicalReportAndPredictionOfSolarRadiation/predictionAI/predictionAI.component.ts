import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-predictionAI',
  templateUrl: './predictionAI.component.html',
  styleUrls: ['./predictionAI.component.css'],
  imports: [BaseChartDirective, CommonModule, FormsModule]
})
export class PredictionAIComponent implements OnInit {


  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  monthOrder: { [key: string]: number } = {
    'Enero': 1,
    'Febrero': 2,
    'Marzo': 3,
    'Abril': 4,
    'Mayo': 5,
    'Junio': 6,
    'Julio': 7,
    'Agosto': 8,
    'Septiembre': 9,
    'Octubre': 10,
    'Noviembre': 11,
    'Diciembre': 12
  };

  startMonth = 'Enero';
  endMonth = 'Diciembre';
  errorMessage = '';
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
    if(this.errorMessage == ''){
      this.apiService.getApi(`ia_prediction/${this.selectedMunicipality}/?start_month=${this.startMonth}&end_month=${this.endMonth}&year=${this.selectedYear}`)
      .subscribe({
        next: (res: any) => {
          console.log('Respuesta:', res);
          this.ranges = res.values;
          this.labels = res.map((d: { month: any; }) => d.month);
          this.allData = res.map((d: { value_kwh: any; }) => d.value_kwh);
          console.log(this.labels);
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


  validateMonths() {
    if (this.monthOrder[this.endMonth] < this.monthOrder[this.startMonth]) {
      this.errorMessage = 'El mes final no puede ser menor al mes inicial';
      this.endMonth = this.startMonth; // opcional: corregir automáticamente
    } else {
      this.errorMessage = '';
    }
  }

}
