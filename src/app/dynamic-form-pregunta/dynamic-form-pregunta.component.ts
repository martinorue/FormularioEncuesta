import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';

@Component({
  selector: 'app-pregunta',
  templateUrl: './dynamic-form-pregunta.component.html'
})
export class DynamicFormPreguntaComponent {
  @Input() pregunta!: Pregunta<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.pregunta.id].valid; }
}