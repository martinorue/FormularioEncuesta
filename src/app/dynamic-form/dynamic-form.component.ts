import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Encuesta } from '../domain/encuesta';

import { Pregunta } from '../domain/pregunta';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';
import { Respuesta } from '../domain/respuesta';
import { PreguntaControlService } from '../services/pregunta-control.service';
import { PreguntaService } from '../services/pregunta.service';
import { RespuestService } from '../services/respuesta.service';
import { RespuestaOpcionMultiple } from '../domain/respuestaOpcionMultiple';
import { RespuestaTextoLibre } from '../domain/respuestaTextoLibre';
import { RespuestaSeleccionUnica } from '../domain/respuestaSeleccionUnica';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta[] | null = [];
  encuesta!: Encuesta;
  form!: FormGroup;
  pregunta!: Pregunta;
  respuestas!: string;
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
    this.respuestas = JSON.stringify(this.form.getRawValue());

    this.feedback = this.form.value;
    const ctrls = this.form.controls;
    let textoRespuesta = [];
    let valorRespuesta = '';

    for (let c in ctrls) {
      valorRespuesta = this.form.get(c)?.value;
      let preguntaId = c;
      const d = new Date();
      let fechaHoraContestada = d.toISOString();
      let tipoPregunta = this.obtenerTipo(c);
      
      if(tipoPregunta == 'TEXTOLIBRE'){
        textoRespuesta.push(new RespuestaTextoLibre(fechaHoraContestada, tipoPregunta, +preguntaId, valorRespuesta));
      }else if(tipoPregunta == 'OPCIONSIMPLE'){
        textoRespuesta.push(new RespuestaSeleccionUnica(fechaHoraContestada, tipoPregunta, +preguntaId, valorRespuesta));
      }
      else if(tipoPregunta == 'OPCIONMULTIPLE'){
        let opcionesSeleccionadas = this.obtenerOpcionesSeleccionadas(c);
        textoRespuesta.push(new RespuestaOpcionMultiple(fechaHoraContestada, tipoPregunta, +preguntaId, opcionesSeleccionadas));
      }
    }

    let id = 2; //json server precisa un id
    const respuesta = new FeedbackEncuesta(id, this.encuesta.EncuestaID, textoRespuesta);

    this.guardarRespuesta(respuesta);
  }

  obtenerOpcionesSeleccionadas(c: string): {OpcionID: number, OpcionTexto: string}[] {
    let opcionesSeleccionadas = [];
    let pos = +c;
    if(this.preguntas !== null){
      for(let opcion of this.preguntas[pos-1].Opciones){
        if(opcion.checked == true){
          opcionesSeleccionadas.push({OpcionID: opcion.OpcionID, OpcionTexto: opcion.OpcionTexto});
        }
      }
    }
    return opcionesSeleccionadas;
  }

  obtenerTipo(c: string): string | undefined {
    let pos = +c;
    if (this.preguntas !== null) {
      return this.preguntas[pos-1].Tipo || undefined;
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

