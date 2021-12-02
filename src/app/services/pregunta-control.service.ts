import { Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  constructor() { }

  toFormGroup(preguntas?: Pregunta<string>[] ) {
    const group: any = {};

    preguntas?.forEach(pregunta => {
      group[pregunta.key] = pregunta.required ? new FormControl(pregunta.value || '', Validators.required)
                                              : new FormControl(pregunta.value || '');
    });
    return new FormGroup(group);
  }
}


