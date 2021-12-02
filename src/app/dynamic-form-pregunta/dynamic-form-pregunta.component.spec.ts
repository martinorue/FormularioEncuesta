import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPreguntaComponent } from './dynamic-form-pregunta.component';

describe('DynamicFormPreguntaComponent', () => {
  let component: DynamicFormPreguntaComponent;
  let fixture: ComponentFixture<DynamicFormPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormPreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
