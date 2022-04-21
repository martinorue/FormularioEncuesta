import { Component, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

import { IPregunta } from '../domain/pregunta';

@Component({
  selector: 'app-preguntas-dinamicas',
  templateUrl: './preguntas-dinamicas.component.html',
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ]
})
export class DynamicFormPreguntaComponent {
  @Input() pregunta!: IPregunta;
  @Input() form!: FormGroup;
  constructor() {

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


}