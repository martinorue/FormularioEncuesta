import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEncuestado } from '../domain/encuestado';

import { Pregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  fg!: FormGroup;

  constructor() { }

  toFormGroup(encuestado:IEncuestado, preguntas?: Pregunta[]) {
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

    group[encuestado?.Nombre!] = new FormControl('');
    group[encuestado?.Correo!] = new FormControl('', [Validators.email]);
    group[encuestado?.Celular!] = new FormControl('');

    this.fg = new FormGroup(group);
    
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



