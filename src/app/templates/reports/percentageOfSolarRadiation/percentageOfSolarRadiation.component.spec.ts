/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PercentageOfSolarRadiationComponent } from './percentageOfSolarRadiation.component';

describe('PercentageOfSolarRadiationComponent', () => {
  let component: PercentageOfSolarRadiationComponent;
  let fixture: ComponentFixture<PercentageOfSolarRadiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageOfSolarRadiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageOfSolarRadiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
