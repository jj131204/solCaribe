import { ApiService } from './../../services/api.service';
import {OnInit, Component } from '@angular/core';
import { MapComponentComponent } from './map-component/map-component.component';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, MapComponentComponent, LayoutComponentComponent, CardsBottomComponent, HttpClientModule  ]
})
export class HomeComponent {


}
