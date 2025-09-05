/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SolarRadiationReportComponent } from './solarRadiationReport.component';

describe('SolarRadiationReportComponent', () => {
  let component: SolarRadiationReportComponent;
  let fixture: ComponentFixture<SolarRadiationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarRadiationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarRadiationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
