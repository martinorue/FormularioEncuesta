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
      if (pregunta.Tipo == 'TEXTOLIBRE' || pregunta.Tipo == 'OPCIONSIMPLE') {
        group[pregunta.PreguntaID] = pregunta.Requerida ? new FormControl(pregunta.value || '', Validators.required)
          : new FormControl(pregunta.value || '');
          //group[pregunta.tipo] = new FormControl(pregunta.tipo);
      }
      else if (pregunta.Tipo == 'OPCIONMULTIPLE') {
        group[pregunta.PreguntaID] = this.formArray(pregunta);
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
    for(let opcion of pregunta.Opciones){
      arr.push(new FormControl([opcion.OpcionID, opcion.checked || false]));
    }
    return arr;
  }




}



