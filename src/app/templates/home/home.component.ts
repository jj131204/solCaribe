import {OnInit, Component } from '@angular/core';
import { MapComponentComponent } from './map-component/map-component.component';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MapComponentComponent, LayoutComponentComponent, CardsBottomComponent ]
})
export class HomeComponent implements OnInit {
 
  ngOnInit(): void {
  }

}
