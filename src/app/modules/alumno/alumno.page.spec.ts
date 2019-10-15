import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPage } from './alumno.page';

describe('AlumnoPage', () => {
  let component: AlumnoPage;
  let fixture: ComponentFixture<AlumnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
