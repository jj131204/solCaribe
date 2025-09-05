import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MapComponentComponent implements OnInit {
  private map: any;
  data: any;
  name = '';
  kwm2 = 0;
  message = '';
  type = 0;
  yearSelected: string = "2023";

  // Arrays para controlar los markers y círculos existentes
  markers: L.Marker[] = [];
  circles: L.Circle[] = [];

  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    this.getData();
  }

  // Llamada al backend
  getData(): void {
    this.apiService.getApi(`locations?year=${this.yearSelected}`)
      .subscribe({
        next: (res) => {
          console.log('Respuesta:', res);
          this.data = res;
          this.initMap();
        },
        error: (err) => {
          console.error('Error al consultar API:', err);
        }
      });
  }

  // Inicializar mapa y dibujar markers
  private initMap(): void {
    if (!this.map) {
      // Crear mapa solo la primera vez
      this.map = L.map('map', { attributionControl: false });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
      }).addTo(this.map);

      const bounds = L.latLngBounds([8.938, -74.042], [12.460, -71.080]);
      this.map.fitBounds(bounds);
    }

    // Limpiar markers y círculos antiguos
    this.markers.forEach(m => this.map.removeLayer(m));
    this.circles.forEach(c => this.map.removeLayer(c));
    this.markers = [];
    this.circles = [];

    // Tomar el primer punto para centrar el mapa y mostrar info
    if(this.data.length > 0){
      const primero = this.data[0];
      this.name = primero.municipality_name;
      this.kwm2 = primero.valor_anual_kwh;
      this.setMessageType(this.kwm2);
      this.map.flyTo([primero.latitude, primero.longitude], 18);
    }

    // Dibujar markers y círculos
    this.data.forEach((p: any) => {
      const solarIcon = L.divIcon({
        className: "custom-icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.getColor(p.valor_anual_kwh)}" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"> 
                 <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
               </svg>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([p.latitude, p.longitude], { icon: solarIcon }).addTo(this.map);
      const circle = L.circle([p.latitude, p.longitude], {
        radius: 50,
        color: this.getColor(p.valor_anual_kwh),
        weight: 1,
        fillColor: this.getColor(p.valor_anual_kwh),
        fillOpacity: 0.2
      }).addTo(this.map);

      L.circle([p.latitude, p.longitude], {
        radius: 50,
        color: this.getColor(p.valor_anual_kwh),
        weight: 1,
        fillColor: this.getColor(p.valor_anual_kwh),
        fillOpacity: 0.3
      }).addTo(this.map);

      marker.on('click', () =>{
        this.map.flyTo([p.latitude, p.longitude], 18, { animate: true, duration: 1 });
        this.onMarkerClick(p.municipality_name, p.valor_anual_kwh)
      });

      this.markers.push(marker);
      this.circles.push(circle);
    });
  }

  onMarkerClick(title: string, kwhm2: number) {
    this.name = title;
    this.kwm2 = kwhm2;
    this.setMessageType(kwhm2);
  }

  setMessageType(kwhm2: number) {
    if (kwhm2 <= 1) {
      this.message = '❌ No rentable para paneles solares';
      this.type = 1;
    } else if (kwhm2 < 1.5) {
      this.message = '⚠️ Rentabilidad moderada para paneles solares';
      this.type = 2;
    } else {
      this.message = '✅ Rentable para paneles solares';
      this.type = 3;
    }
  }

  getColor(valor_anual_kwh: number): string {
    if (valor_anual_kwh <= 1) return '#F74F52'; 
    if (valor_anual_kwh < 1.5) return '#9CCC65';
    return '#F39200';
  }

  // Función para cambiar el año desde el select
  onYearChange() {
    this.getData();
  }
}
