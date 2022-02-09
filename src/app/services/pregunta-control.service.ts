import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEncuestado } from '../domain/encuestado';

import { Pregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  fg!: FormGroup;
  constructor() { }

  toFormGroup(encuestado: IEncuestado, preguntas?: Pregunta[]) {
    const group: any = {};

    preguntas?.forEach(pregunta => {
      if (pregunta.Tipo == 'TEXTOLIBRE' || pregunta.Tipo == 'OPCIONSIMPLE') {

        group[pregunta.PreguntaID] = pregunta.Requerida ? new FormControl('', [Validators.required, this.noWhitespaceValidator])
          : new FormControl('', [Validators.pattern(/[\S]/)]);
      }
      else if (pregunta.Tipo == 'OPCIONMULTIPLE') {
        group[pregunta.PreguntaID] = this.formArray(pregunta);
      }
    });

    group[encuestado?.Nombre!] = new FormControl('' , [Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]);
    group[encuestado?.Correo!] = new FormControl('', [Validators.email]);
    group[encuestado?.Celular!] = new FormControl('', [Validators.pattern("^[0-9]{3,45}$")]);

    this.fg = new FormGroup(group);
    
    return this.fg;
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  formArray(pregunta: Pregunta): FormArray {
    const arr = new FormArray([]);
    for (let opcion of pregunta.Opciones) {
      arr.push(new FormControl([opcion.OpcionID, opcion.checked || false]));
    }
    return arr;
  }
}



