import { Component, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

import { Pregunta } from '../domain/pregunta';

@Component({
  selector: 'app-pregunta',
  templateUrl: './dynamic-form-pregunta.component.html',
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
  ]
})
export class DynamicFormPreguntaComponent {
  @Input() pregunta!: Pregunta;
  @Input() form!: FormGroup;

  chequeado(OpcionId: number){
    for(let opcion of this.pregunta.Opciones){
      if(opcion.OpcionID == OpcionId){
        opcion.checked = !opcion.checked;
      }
    }
  }

  get isValid() {
    let formControls = this.form.controls[this.pregunta.PreguntaID];
    return formControls.valid;
  }
}