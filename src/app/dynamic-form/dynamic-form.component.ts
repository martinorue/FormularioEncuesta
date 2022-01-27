import { Component, Input, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Encuesta } from '../domain/encuesta';
import { Pregunta } from '../domain/pregunta';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';
import { PreguntaControlService } from '../services/pregunta-control.service';
import { PreguntaService } from '../services/pregunta.service';
import { RespuestaService } from '../services/respuesta.service';
import { RespuestaOpcionMultiple } from '../domain/respuestaOpcionMultiple';
import { RespuestaTextoLibre } from '../domain/respuestaTextoLibre';
import { RespuestaSeleccionUnica } from '../domain/respuestaSeleccionUnica';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService, ErrorStateMatcher]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta[] | null = [];
  @Input() encuesta!: Encuesta | null;
  form!: FormGroup;
  pregunta!: Pregunta;
  respuestas!: string;
  feedback!: string;
  checked!: boolean;
  respuestaSubmit!: FeedbackEncuesta;
  msjUsuario: string = '';
  respuestaErrMess!: string;

  @ViewChild('eform') encuestaFormDirective: any

  constructor(private pcs: PreguntaControlService, private servicePregunta: PreguntaService, private respuestaService: RespuestaService) { }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta[]);

    //this.servicePregunta.getEncuesta().subscribe(encuesta => this.encuesta = encuesta);

    //this.servicePregunta.getPreguntas().subscribe(preguntas => this.preguntas = preguntas);
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

      if (tipoPregunta == 'TEXTOLIBRE') {
        textoRespuesta.push(new RespuestaTextoLibre(fechaHoraContestada, tipoPregunta, +preguntaId, valorRespuesta));
      } else if (tipoPregunta == 'OPCIONSIMPLE') {
        let opcionTexto = this.form.get(c)?.value;
        let opcionId = this.obtenerOpcionSeleccionada(c, opcionTexto);
        let opcionSeleccionada = { OpcionID: opcionId, OpcionTexto: opcionTexto };
        textoRespuesta.push(new RespuestaSeleccionUnica(fechaHoraContestada, tipoPregunta, +preguntaId, opcionSeleccionada));
      }
      else if (tipoPregunta == 'OPCIONMULTIPLE') {
        let opcionesSeleccionadas = this.obtenerOpcionesSeleccionadas(c);
        textoRespuesta.push(new RespuestaOpcionMultiple(fechaHoraContestada, tipoPregunta, +preguntaId, opcionesSeleccionadas));
      }
    }

    //let id = Math.random(); //json server precisa un id
    if (this.encuesta != null) {
      const respuesta = new FeedbackEncuesta(this.encuesta.EncuestaID, textoRespuesta);
      const resJSON = JSON.stringify(respuesta);
      console.log(resJSON);

      this.guardarRespuesta(resJSON);

      this.encuestaFormDirective.resetForm();

      respuesta.Respuestas.filter(respuesta => {
        if (respuesta.Tipo == 'OPCIONMULTIPLE') {
          this.resetCheckboxes(respuesta.PreguntaID.toString());
        }
      });
    }


    this.msjUsuario = 'Se guardaron las respuestas. Gracias por su participación.'
    setTimeout(() => this.msjUsuario = '', 3000);

  }

  resetCheckboxes(preguntaId: string) {
    let pos = +preguntaId;
    if (this.preguntas !== null) {
      for (let opcion of this.preguntas[pos - 1].Opciones) {
        if (opcion.checked == true) {
          opcion.checked = false;
        }
      }
    }
  }

  obtenerOpcionSeleccionada(c: string, textoRespuesta: string): number {
    let opcionSeleccionadaId: number = 0;
    let pos = +c;
    if (this.preguntas !== null) {
      for (let opcion of this.preguntas[pos - 1].Opciones) {
        if (opcion.OpcionTexto == textoRespuesta) {
          opcionSeleccionadaId = opcion.OpcionID;
        }
      }
    }
    return opcionSeleccionadaId;
  }

  obtenerOpcionesSeleccionadas(c: string): { OpcionID: number, OpcionTexto: string }[] {
    let opcionesSeleccionadas = [];
    let pos = +c;
    if (this.preguntas !== null) {
      for (let opcion of this.preguntas[pos - 1].Opciones) {
        if (opcion.checked == true) {
          opcionesSeleccionadas.push({ OpcionID: opcion.OpcionID, OpcionTexto: opcion.OpcionTexto });
        }
      }
    }
    return opcionesSeleccionadas;
  }

  obtenerTipo(c: string): string {
    let pos = +c;
    console.log(pos);
    const pregunta = this.preguntas?.filter(p => p.PreguntaID = +c);
    if (pregunta != null) {
      console.log(pregunta[0].Tipo);
      return pregunta[0].Tipo;
    } else {
      return ''
    }
  }


  guardarRespuesta(respuesta: string) {
    this.respuestaService.submitRespuesta(respuesta)
      .subscribe(respuestaSubmit => this.respuestaSubmit = respuestaSubmit,
        errmess => this.respuestaErrMess = <any>errmess);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.pcs.toFormGroup(this.preguntas as Pregunta[]);
  }

  // isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  //   const isSubmitted = form && form.submitted;
  //   return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  // }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();
}


   

