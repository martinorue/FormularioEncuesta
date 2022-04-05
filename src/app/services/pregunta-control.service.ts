import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEncuestado } from '../domain/respuesta'
import { IPregunta } from '../domain/pregunta';

@Injectable()
export class PreguntaControlService {
  fg!: FormGroup;
  multiples_fg!: FormGroup;
  // encuestado_fg!: FormGroup;

  constructor(  ) { }

  toFormGroup(encuestado: IEncuestado, preguntas?: IPregunta[]) {
    const group: any = {};
    const datos_encuestado: any = {};
    preguntas?.forEach(pregunta => {
      if (pregunta.Tipo == 'TEXTOLIBRE' || pregunta.Tipo == 'OPCIONSIMPLE') {

        group[pregunta.PreguntaID] = pregunta.Requerida ? new FormControl('', [Validators.required, this.noWhitespaceValidator])
          : new FormControl('', [Validators.pattern(/[\S]/)]);
      }
      else if (pregunta.Tipo == 'OPCIONMULTIPLE') {
        group[pregunta.PreguntaID] = this.formArray(pregunta);
        // multiples[pregunta.PreguntaID] = this.formArray(pregunta);
      }
    });

    // datos_encuestado[encuestado?.Nombre!] = new FormControl('', [Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]);
    // datos_encuestado[encuestado?.Correo!] = new FormControl('', [Validators.email]);
    // datos_encuestado[encuestado?.Celular!] = new FormControl('', [Validators.pattern("^[0-9]{3,45}$")]);

    this.fg = new FormGroup(group);
    // this.encuestado_fg = new FormGroup(datos_encuestado);
    // this.multiples_fg = new FormGroup(multiples);
    console.log(group);
    
    return this.fg;
  }

  toFormGroupMultiples(preguntas?: IPregunta[]) {
    const multiples: any = {};
    preguntas?.forEach(pregunta => {
      if (pregunta.Tipo == 'OPCIONMULTIPLE') {
          multiples[pregunta.PreguntaID] = this.formArray(pregunta);
          
        
      }
    });
    this.multiples_fg = new FormGroup(multiples);
    return this.multiples_fg;
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  formArray(pregunta: IPregunta): FormArray {
    const arr = new FormArray([]);
    for (let opcion of pregunta.Opciones) {
      arr.push(new FormControl(false));
    }
    return arr;
  }
}



