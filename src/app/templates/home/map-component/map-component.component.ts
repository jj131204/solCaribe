import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
  imports: [CommonModule]
})
export class MapComponentComponent implements OnInit {
  private map: any;
  private data: any;
  name = '';
  kwm2 = 0;
  message = '';
  type = 0;

  ngOnInit(): void {
    this.getData();
  }

  constructor(private apiService: ApiService, private http: HttpClient){}

  getData(): void {
    this.apiService.getApi('locations')
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

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    }).addTo(this.map);

    const bounds = L.latLngBounds(
      [8.938, -74.042],
      [12.460, -71.080]
    );
    this.map.fitBounds(bounds);

    const primero = this.data[0];
    this.name = this.data[0].municipality_name;
    this.kwm2 = this.data[0].valor_anual_kwh;
    if (this.kwm2 <= 1) {
        this.message = '❌ No rentable para paneles solares';
        this.type = 1;
    }
    else if (this.kwm2 < 1.5){
      this.message = '️⚠️ Rentabilidad moderada para paneles solares';
      this.type = 2;
    }else{
      this.message = '✅ Rentable para paneles solares';
      this.type = 3;
    }
    this.map.flyTo([primero.latitude, primero.longitude], 18);

    this.data.forEach((p: { valor_anual_kwh: number; latitude: number; longitude: number; municipality_name: string; }) => {

      const solarIcon = L.divIcon({
      className: "custom-icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.getColor(p.valor_anual_kwh)}" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"> <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/> </svg>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const marker = L.marker([p.latitude, p.longitude], { icon: solarIcon })
        .addTo(this.map)

      L.circle([p.latitude, p.longitude], {
        radius: 50,
        color: this.getColor(p.valor_anual_kwh),
        weight: 1,
        fillColor: this.getColor(p.valor_anual_kwh),
        fillOpacity: 0.3
      }).addTo(this.map);

      marker.on('click', () => {
        this.map.flyTo([p.latitude, p.longitude], 18, {
          animate: true,
          duration: 1
        });
        this.onMarkerClick(p.municipality_name, p.valor_anual_kwh);
      });

       this.map.on('click', (e: any) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        console.log(`Coordenadas del clic: Latitud ${lat}, Longitud ${lng}`);
        // Aquí podrías agregar el código para copiar las coordenadas,
        // por ejemplo, actualizando una variable o un campo de texto
        // en tu componente de Angular.
      });
    });
  }

  onMarkerClick(title: string, kwhm2: number) {
      this.name = title;
      this.kwm2 = kwhm2;

      if (kwhm2 <= 1) {
        this.message = '❌ No rentable para paneles solares';
        this.type = 1;
      }
      else if (kwhm2 < 1.5){
        this.message = '️⚠️ Rentabilidad moderada para paneles solares';
        this.type = 2;
      }else{
        this.message = '✅ Rentable para paneles solares';
        this.type = 3;
      }
      
  }

  getColor(valor_anual_kwh: number): string {
    if (valor_anual_kwh <= 1) return '#F74F52'; 
    if (valor_anual_kwh < 1.5) return '#9CCC65';
    return '#F39200';
  }
}
