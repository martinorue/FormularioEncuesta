import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  fg!: FormGroup;

  constructor() { }

  toFormGroup(preguntas?: Pregunta[]) {
    const group: any = {};

    preguntas?.forEach(pregunta => {
      if (pregunta.tipo == 'TextoLibre' || pregunta.tipo == 'SeleccionUnica') {
        group[pregunta.id] = pregunta.requerido ? new FormControl(pregunta.value || '', Validators.required)
          : new FormControl(pregunta.value || '');
          //group[pregunta.tipo] = new FormControl(pregunta.tipo);
      }
      else if (pregunta.tipo == 'OpcionMultiple') {
        group[pregunta.id] = this.formArray(pregunta);
      }
    });

    this.fg = new FormGroup(group);
    //console.log(this.fg);
    //group.key = 'holis';
    //console.log(group);
    return this.fg;
  }

  formArray(pregunta: Pregunta): FormArray {
    const arr = new FormArray([]);
    for(let opcion of pregunta.opciones){
      arr.push(new FormControl([opcion.opcionId, opcion.checked || false]));
    }
    return arr;
  }




}



