/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistoricalReportAndPredictionOfSolarRadiationComponent } from './historicalReportAndPredictionOfSolarRadiation.component';

describe('HistoricalReportAndPredictionOfSolarRadiationComponent', () => {
  let component: HistoricalReportAndPredictionOfSolarRadiationComponent;
  let fixture: ComponentFixture<HistoricalReportAndPredictionOfSolarRadiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalReportAndPredictionOfSolarRadiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalReportAndPredictionOfSolarRadiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
