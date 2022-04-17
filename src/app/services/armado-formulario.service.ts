import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IEncuestado } from '../domain/respuesta'
import { IPregunta } from '../domain/pregunta';

@Injectable()
export class ArmadoFormulario {
  fg!: FormGroup;
  multiples_fg!: FormGroup;

  constructor() { }

  toFormGroup(encuestado: IEncuestado, preguntas?: IPregunta[]) {
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

    group[encuestado?.Nombre!] = new FormControl('', [Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]);
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

  formArray(pregunta: IPregunta): FormArray {
    const arr = new FormArray([]);
    for (let opcion of pregunta.Opciones) {
      arr.push(new FormControl([false, [this.requiredMinCheckbox]]));
    }
    return arr;
  }

  requiredMinCheckbox(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

}



