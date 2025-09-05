import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../../components/layout-component/layout-component.component';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-solarRadiationReport',
  templateUrl: './solarRadiationReport.component.html',
  styleUrls: ['./solarRadiationReport.component.css'],
  imports: [CommonModule, LayoutComponentComponent, FormsModule]
})
export class SolarRadiationReportComponent implements OnInit {
  departments: any;
  selectedDepartment: String = "";

  municipalities: any;

  ngOnInit(): void {
    this.getData();
  }

  constructor(private apiService: ApiService, private http: HttpClient){}

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

  exportPDF() {
    if (!this.municipalities || this.municipalities.length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    const doc = new jsPDF();
    doc.text('Reporte de Radiación Solar', 14, 10);

    
    const body = this.municipalities.municipalities.map((m: any) => {
      const nombre = m.municipio ?? m.municipality_name ?? m.name ?? '';
      const maxMonth = m.max?.month ?? m.max?.mes ?? '';
      const maxVal = m.max?.value_kwh ?? m.max?.value ?? '';
      const meanMonth = m.mean?.month ?? m.mean?.mes ?? '';
      const meanVal = m.mean?.value_kwh ?? m.mean?.value ?? '';
      const minMonth = m.min?.month ?? m.min?.mes ?? '';
      const minVal = m.min?.value_kwh ?? m.min?.value ?? '';

      // Formateamos cada celda como string (puedes cambiar formato)
      const mayor = maxMonth ? `${maxMonth}2024 - ${maxVal}kWh/m2_dia` : `${maxVal}kWh/m2_dia`;
      const mediana = meanMonth ? `${meanMonth}2024 - ${meanVal} kWh/m2_dia` : `${meanVal}kWh/m2_dia`;
      const baja = minMonth ? `${minMonth}2024 - ${minVal}kWh/m2_dia` : `${minVal}kWh/m2_dia`;

      return [ nombre, mayor, mediana, baja ];
    });

    autoTable(doc, {
      head: [['MUNICIPIO', 'MAYOR RADIACIÓN', 'MEDIANA RADIACIÓN', 'BAJA RADIACIÓN']],
      body: body
    });

    doc.save('reporteRadiacionSolar.pdf');
  }


  exportExcel() {
    if (!this.municipalities || this.municipalities.length === 0) {
      console.warn('No hay datos para exportar');
      return;
    }

    // Prepara los datos como un arreglo de objetos plano
    const data = this.municipalities.municipalities.map((m: any) => ({
      Municipio: m.municipio,
      'Mayor Radiación': `${m.max.month}2024 -  ${m.max.value_kwh}kWh/m2_dia`,
      'Mediana Radiación': `${m.mean.month}2024 -  ${m.mean.value_kwh}kWh/m2_dia`,
      'Baja Radiación': `${m.min.month}2024 -  ${m.min.value_kwh}kWh/m2_dia`
    }));

    // Crea la hoja
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Crea el libro
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Reporte': worksheet },
      SheetNames: ['Reporte']
    };

    // Genera el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guarda el archivo en el cliente
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'reporteRadiacionSolar.xlsx');
  }

}
