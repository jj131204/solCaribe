/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsBottomComponent } from './cards-bottom.component';

describe('CardsBottomComponent', () => {
  let component: CardsBottomComponent;
  let fixture: ComponentFixture<CardsBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
