import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaPage } from './prueba.page';

describe('PruebaPage', () => {
  let component: PruebaPage;
  let fixture: ComponentFixture<PruebaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
