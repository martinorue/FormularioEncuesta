import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Encuesta } from '../domain/encuesta';

import { Pregunta } from '../domain/pregunta';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';
import { Respuesta } from '../domain/respuesta';
import { PreguntaControlService } from '../services/pregunta-control.service';
import { PreguntaService } from '../services/pregunta.service';
import { RespuestService } from '../services/respuesta.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta[] | null = [];
  encuesta!: Encuesta;
  form!: FormGroup;
  respuestas!: string;
  pregunta!: Pregunta;
  feedback!: string;
  checked!: boolean;
  respuestaSubmit!: FeedbackEncuesta;

  constructor(private pcs: PreguntaControlService, private ps: PreguntaService, private respuestaService: RespuestService) { }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta[]);

    this.ps.getEncuesta().subscribe(encuesta => this.encuesta = encuesta[0]);

    this.ps.getPreguntas().subscribe(preguntas => this.preguntas = preguntas);
  }

  onSubmit() {
    //mensaje al cliente
    //que solo traiga las opciones checked == true
    this.respuestas = JSON.stringify(this.form.getRawValue());

    this.feedback = this.form.value;
    const ctrls = this.form.controls;
    let textoRespuesta = [];
    let valorRespuesta = '';

    let primeraPregunta = this.preguntas ? [0] : Pregunta;
    

    for (let c in ctrls) {
      valorRespuesta = this.form.get(c)?.value;
      textoRespuesta.push(new Respuesta<string>(valorRespuesta, this.obtenerTipo(c)));
    }

    let id = 2; //json server precisa un id
    const respuesta = new FeedbackEncuesta(id, this.encuesta.EncuestaID, textoRespuesta);


    //const ctrls_key = this.form.controls.key;

    /*for(let c in ctrls){
      console.log(c);
    }
    1
    2
    */

    // console.log(this.respuestas);
    // {"1":"res1","2":"res2"}




    // console.log(this.respuestas);
    //this.form.valueChanges.subscribe(data => this.respuestas = data);
    // if (this.preguntas !== null) {
    //   for (let p of this.preguntas) {
    //     if (p.tipo == 'OpcionMultiple') {
    //       for (let o of p.opciones) {
    //         if (o.checked == true) {
    //           console.log(o.value);
    //         }
    //       }
    //     }
    //   }
    // }

    this.guardarRespuesta(respuesta);


  }

  obtenerTipo(c: string): string | undefined {
    let pos = +c;
    console.log(pos);
    if(this.preguntas !== null){
      return this.preguntas[pos-1].tipo || undefined;
    }
    return '';
  }


  guardarRespuesta(respuesta: FeedbackEncuesta) {
    this.respuestaService.submitRespuesta(respuesta)
      .subscribe(respuestaSubmit => this.respuestaSubmit = respuestaSubmit);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta[]);
  }

}