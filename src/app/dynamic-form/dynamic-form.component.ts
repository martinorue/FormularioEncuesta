import { Component, Input, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Encuesta } from '../domain/encuesta';
import { Pregunta } from '../domain/pregunta';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';
import { PreguntaControlService } from '../services/pregunta-control.service';
import { RespuestaService } from '../services/respuesta.service';
import { RespuestaOpcionMultiple } from '../domain/respuestaOpcionMultiple';
import { RespuestaTextoLibre } from '../domain/respuestaTextoLibre';
import { RespuestaSeleccionUnica } from '../domain/respuestaSeleccionUnica';
import { ErrorStateMatcher } from '@angular/material/core';
import { IEncuestado } from '../domain/encuestado';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService, ErrorStateMatcher]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta[] | null = [];
  @Input() encuesta!: Encuesta | null;
  form!: FormGroup;
  respuestas!: string;
  feedback!: string;
  checked!: boolean;
  respuestaSubmit!: FeedbackEncuesta;
  msjUsuario: string = '';
  respuestaErrMess!: string;
  respuestaHttp!: number;

  encuestado: IEncuestado = {
    PersonaId: 0,
    Nombre: 'nombreEncuestado',
    Correo: 'emailEncuestado',
    Celular: 'celEncuestado'
  };

  @ViewChild('eform') encuestaFormDirective: any

  constructor(
    private _pcs: PreguntaControlService,
    private _respuestaService: RespuestaService,
    private _messageService: MessageService) {
  }

  ngOnInit() {
    this.form = this._pcs.toFormGroup(this.encuestado, this.preguntas as Pregunta[]);
  }

  onSubmit() {
    this.respuestas = JSON.stringify(this.form.getRawValue());
    this.feedback = this.form.value;
    const ctrls = this.form.controls;
    let textoRespuestas = [];
    let valorRespuesta = '';

    const encuestado: IEncuestado = {
      PersonaId: 0,
      Nombre: this.form.value.nombreEncuestado,
      Correo: this.form.value.emailEncuestado,
      Celular: this.form.value.celEncuestado
    }

    for (let c in ctrls) {
      if (c != 'nombreEncuestado' && c != 'emailEncuestado' && c != 'celEncuestado') {
        valorRespuesta = this.form.get(c)?.value;
        let preguntaId = c;
        const d = new Date();
        let fechaHoraContestada = d.toISOString();
        let tipoPregunta = this.obtenerTipo(c);

        if (tipoPregunta == 'TEXTOLIBRE') {
          textoRespuestas.push(new RespuestaTextoLibre(fechaHoraContestada, tipoPregunta, +preguntaId, valorRespuesta));
        } else if (tipoPregunta == 'OPCIONSIMPLE') {
          let opcionTexto = this.form.get(c)?.value;
          let opcionId = this.obtenerOpcionSeleccionada(c, opcionTexto);
          let opcionSeleccionada = { OpcionID: opcionId, OpcionTexto: opcionTexto };
          textoRespuestas.push(new RespuestaSeleccionUnica(fechaHoraContestada, tipoPregunta, +preguntaId, opcionSeleccionada));
        }
        else if (tipoPregunta == 'OPCIONMULTIPLE') {
          let opcionesSeleccionadas = this.obtenerOpcionesSeleccionadas(c);
          textoRespuestas.push(new RespuestaOpcionMultiple(fechaHoraContestada, tipoPregunta, +preguntaId, opcionesSeleccionadas));
        }
      }

    }

    if (this.encuesta != null) {
      const respuesta = new FeedbackEncuesta(this.encuesta.EncuestaID, textoRespuestas, encuestado);
      const resJSON = JSON.stringify(respuesta);

      this.guardarRespuesta(resJSON);

      this.encuestaFormDirective.resetForm();

      respuesta.Respuestas.filter(respuesta => {
        if (respuesta.Tipo == 'OPCIONMULTIPLE') {
          this.resetCheckboxes(respuesta.PreguntaID.toString());
        }
      });
    }
  }

  resetCheckboxes(preguntaId: string) {
    let pos = +preguntaId;
    const pregunta = this.preguntas?.filter(p => p.PreguntaID == pos);
    if (pregunta != null) {
      for (let opcion of pregunta[0].Opciones) {
        if (opcion.checked) {
          opcion.checked = false;
        }
      }
    }
  }

  obtenerOpcionSeleccionada(c: string, textoRespuesta: string): number {
    let opcionSeleccionadaId: number = 0;
    const pregunta = this.preguntas?.find(p => p.PreguntaID == +c);

    if (pregunta != null) {
      for (let opcion of pregunta.Opciones) {
        if (opcion.OpcionTexto == textoRespuesta) {
          opcionSeleccionadaId = opcion.OpcionID;
        }
      }
    }
    return opcionSeleccionadaId;
  }

  obtenerOpcionesSeleccionadas(c: string): { OpcionID: number, OpcionTexto: string }[] {
    let opcionesSeleccionadas = [];

    const pregunta = this.preguntas?.find(p => p.PreguntaID == +c);

    if (pregunta != null) {
      for (let opcion of pregunta.Opciones) {
        if (opcion.checked) {
          opcionesSeleccionadas.push({ OpcionID: opcion.OpcionID, OpcionTexto: opcion.OpcionTexto });
        }
      }
    }
    return opcionesSeleccionadas;
  }

  obtenerTipo(c: string): string {
    let pos = +c;
    const pregunta = this.preguntas?.find(p => p.PreguntaID == +c);
    if (pregunta != null) {
      return pregunta.Tipo;
    } else {
      return ''
    }
  }

  guardarRespuesta(respuesta: string) {
    this._respuestaService.submitRespuesta(respuesta)
    .subscribe(response => {this.respuestaHttp = response.status
      if(this.respuestaHttp == 200){
        this._messageService.showInfo('Se guardaron las respuestas. Gracias por participar', 'top right')
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this._pcs.toFormGroup(this.encuestado, this.preguntas as Pregunta[]);
  }

  chequeadas(): boolean {
    if(this.preguntas?.filter(pregunta => pregunta?.Requerida == true 
      && pregunta.Tipo == 'OPCIONMULTIPLE' 
      && pregunta?.Opciones?.filter(opcion => opcion.checked == true).length == 0).length == 0){
      return true;
    }else{
      return false;
    }
  }

  matcher = new ErrorStateMatcher();

}




