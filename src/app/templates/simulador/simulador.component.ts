import { Component, OnInit } from '@angular/core';
import { LayoutComponentComponent } from '../../components/layout-component/layout-component.component';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
  imports: [LayoutComponentComponent]
})
export class SimuladorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
