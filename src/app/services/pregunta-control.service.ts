import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  fg!: FormGroup;

  constructor() { }

  toFormGroup(preguntas?: Pregunta<string>[]) {
    const group: any = {};

    preguntas?.forEach(pregunta => {
      // group[pregunta.id] = pregunta.requerido ? new FormControl(pregunta.value || '', Validators.required)
      //   : new FormControl(pregunta.value || '')
      if (pregunta.tipo == 'TextoLibre' || pregunta.tipo == 'SeleccionUnica') {
        group[pregunta.id] = pregunta.requerido ? new FormControl(pregunta.value || '', Validators.required)
          : new FormControl(pregunta.value || '');
      }
      else if (pregunta.tipo == 'OpcionMultiple') {

        group[pregunta.id] = this.formArray(pregunta);
        
      }
    });

    this.fg = new FormGroup(group);
    
    return this.fg;
  }

  formArray(pregunta: Pregunta<string>): FormArray {
    const arr = new FormArray([]);
    for(let opcion of pregunta.opciones){
      arr.push(new FormControl([opcion.opcionId, opcion.checked || false]));
    }
    return arr;
  }




}



