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

  chequeado(opcionId: number){
    for(let opcion of this.pregunta.opciones){
      if(opcion.opcionId == opcionId){
        opcion.checked = !opcion.checked;
        console.log(opcion.checked);
      }
    }
  }


  get isValid() {
    let formControls = this.form.controls[this.pregunta.id];
    //console.log(formControls);
    return formControls.valid;
    //return this.form.controls[this.pregunta.id].valid }
  }
}