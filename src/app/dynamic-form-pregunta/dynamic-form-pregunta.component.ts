import { Component, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

import { Pregunta } from '../domain/pregunta';
import { PreguntaControlService } from '../services/pregunta-control.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './dynamic-form-pregunta.component.html',
  // providers: [
  //   { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  // ]
})
export class DynamicFormPreguntaComponent {
  @Input() pregunta!: Pregunta;
  @Input() form!: FormGroup;
  @Input() toppings!: FormGroup;
  constructor(private _preguntaControlService: PreguntaControlService) {

  }

  chequeado(OpcionId: number) {
    for (let opcion of this.pregunta.Opciones) {
      if (opcion.OpcionID == OpcionId) {
        opcion.checked = !opcion.checked;
      }
    }
  }

  hayChequeadas(): boolean {
    if (this.pregunta.Requerida == true && this.pregunta.Tipo == 'OPCIONMULTIPLE') {
      if (this.pregunta.Opciones.filter(opcion => opcion.checked == true).length == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  get isValid() {
    let formControls = this.form.controls[this.pregunta.PreguntaID];

    return formControls.valid;
  }


}