import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
  imports: [LayoutComponentComponent]
})
export class SimuladorComponent implements OnInit {
  private map: any;
  private data: any;
  selectedLat: number | null = null;
  selectedLng: number | null = null;
   marker!: L.Marker; 
  
  solarIcon = L.divIcon({
  className: "custom-icon",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3194d2" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"> <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/> </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })

  
  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false
    });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const bounds = L.latLngBounds(
      [8.938, -74.042],
      [12.460, -71.080]
    );
    this.map.fitBounds(bounds);

    // Evento clic
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      console.log('Clic en:', lat, lng);

      // Guardar en variables
      this.selectedLat = lat;
      this.selectedLng = lng;

      // Si ya hay un marker, lo movemos; si no, lo creamos
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng], { icon: this.solarIcon }).addTo(this.map)
          .bindPopup(`Seleccionado: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
          .openPopup();
      }
    });
  }


}
