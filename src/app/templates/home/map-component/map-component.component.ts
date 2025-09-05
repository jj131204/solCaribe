import { OnInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {
  private map: any;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false
    });

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.map);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    }).addTo(this.map);

    const bounds = L.latLngBounds(
      [8.938, -74.042],
      [12.460, -71.080]
    );
    this.map.fitBounds(bounds);

    const puntos = [
      { lat: 11.7136, lon: -72.659, titulo: 'Uribia', radiacion: 4, radio: 50  },
      { lat: 11.3859, lon: -72.239, titulo: 'Maicao', radiacion: 5.5, radio: 50  },
      { lat: 11.5449, lon: -72.907, titulo: 'Riohacha', radiacion: 1, radio: 50  },
    ];

    const primero = puntos[0];
    this.map.flyTo([primero.lat, primero.lon], 18);

    puntos.forEach(p => {

      const solarIcon = L.divIcon({
      className: "custom-icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.getColor(p.radiacion)}" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"> <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/> </svg>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const marker = L.marker([p.lat, p.lon], { icon: solarIcon })
        .addTo(this.map)

      L.circle([p.lat, p.lon], {
        radius: p.radio,
        color: this.getColor(p.radiacion),
        weight: 1,
        fillColor: this.getColor(p.radiacion),
        fillOpacity: 0.3
      }).addTo(this.map);

      marker.on('click', () => {
        this.map.flyTo([p.lat, p.lon], 18, {
          animate: true,
          duration: 1
        });
        this.onMarkerClick(p.titulo, [p.lat, p.lon]);
      });
    });
  }

  onMarkerClick(title: string, coords: number[]) {
      console.log("Se ejecuta")
  }

  getColor(radiacion: number): string {
    if (radiacion < 3) return '#F74F52'; 
    if (radiacion < 5) return '#9CCC65';
    return '#F39200';
  }
}
