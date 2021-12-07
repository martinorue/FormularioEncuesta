import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';
import { Respuesta } from '../domain/respuesta';
import { PreguntaControlService } from '../services/pregunta-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta<string>[] | null = [];
  form!: FormGroup;
  respuestas!: string;
  pregunta!: Pregunta<string>;
  feedback!: string;
  checked!: boolean;

  constructor(private pcs: PreguntaControlService) { }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta<string>[]);
  }

  onSubmit() {
    //mensaje al cliente
    //que solo traiga las opciones checked == true
    this.respuestas = JSON.stringify(this.form.getRawValue());
    
    this.feedback = this.form.value;
    console.log(this.feedback);
    
    
    //this.form.valueChanges.subscribe(data => this.respuestas = data);
    if (this.preguntas !== null) {
      for (let p of this.preguntas) {
        if (p.tipo == 'OpcionMultiple') {
          for (let o of p.opciones) {
            if (o.checked == true) {
              console.log(o.value);
            }
          }
        }
      }
    }


    console.log(this.respuestas);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta<string>[]);
  }

}