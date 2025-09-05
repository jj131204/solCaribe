import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../../components/layout-component/layout-component.component';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-percentageOfSolarRadiation',
  templateUrl: './percentageOfSolarRadiation.component.html',
  styleUrls: ['./percentageOfSolarRadiation.component.css'],
  imports: [CommonModule, LayoutComponentComponent, FormsModule]
})
export class PercentageOfSolarRadiationComponent implements OnInit {
  departments: any;
  selectedDepartment: String = "";

  municipalities: any;


  constructor(private apiService: ApiService, private http: HttpClient) { }

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


  sendDepartment(){
    if(this.selectedDepartment != ''){
      this.apiService.getApi(`departments/${this.selectedDepartment}`)
        .subscribe({
          next: (res) => {
            console.log('Respuesta:', res);
            this.municipalities = res;
          },
          error: (err) => {
            console.error('Error al consultar API:', err);
          }
        });
    }
  }
}
