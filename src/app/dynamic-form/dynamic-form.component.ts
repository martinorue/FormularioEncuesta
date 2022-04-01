import { Component, Input, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pregunta } from '../domain/pregunta';
import { PreguntaControlService } from '../services/pregunta-control.service';
import { RespuestaService } from '../services/respuesta.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IEncuestaContestada, IEncuestado, IRespuesta, IRespuestaMultiple, IRespuestaSimple, IRespuestaTextoLibre } from '../domain/respuesta';
import { MessageService } from '../services/message.service';
import { IEncuesta } from '../domain/encuesta';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [PreguntaControlService, ErrorStateMatcher]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: Pregunta[] | null = [];
  @Input() encuesta!: IEncuesta | null;
  form!: FormGroup;
  toppings!: FormGroup;
  multiples!: FormGroup;
  respuestas!: string;
  feedback!: string;
  checked!: boolean;
  msjUsuario: string = '';
  respuestaErrMess!: string;
  respuestaHttp!: number;
  matcher = new ErrorStateMatcher();

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
    private _messageService: MessageService,
    private _fb: FormBuilder) {
    this.toppings = _fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    })

  }

  ngOnInit() {
    this.form = this._pcs.toFormGroup(this.encuestado, this.preguntas as Pregunta[]);
    const preguntasMultiples: Pregunta[] | undefined = this.preguntas?.filter(p => p.Tipo == 'OPCIONMULTIPLE');

    for (let pm in preguntasMultiples) {
      { pm.}
      this.multiples = this._fb.group({
        PreguntaID: false
      })
    }

  }

  onSubmit() {
    this.respuestas = JSON.stringify(this.form.getRawValue());
    this.feedback = this.form.value;
    console.log('JSON.stringify(this.form.getRawValue())', this.respuestas);
    console.log('this.form.value', this.feedback);
    const ctrls = this.form.controls;
    let textoRespuestas: IRespuesta[] = [];

    const encuestado: IEncuestado = {
      PersonaId: 0,
      Nombre: this.form.value.nombreEncuestado,
      Correo: this.form.value.emailEncuestado,
      Celular: this.form.value.celEncuestado
    }

    if (this.encuesta != null) {

      for (let c in ctrls) {
        if (c != 'nombreEncuestado' && c != 'emailEncuestado' && c != 'celEncuestado') {
          let valorRespuesta = this.form.get(c)?.value;
          console.log(this.form.get(c));
          debugger
          let preguntaId = c;
          const d = new Date();
          let fechaHoraContestada = d.toISOString();
          let tipoPregunta = this.obtenerTipo(c);


          if (tipoPregunta == 'TEXTOLIBRE') {

            const respuestaTextoLibre: IRespuestaTextoLibre = {
              RespuestaID: 0,
              FechaHoraContestada: fechaHoraContestada,
              Tipo: tipoPregunta,
              PreguntaID: +preguntaId,
              TextoRespuesta: valorRespuesta
            }

            textoRespuestas.push(respuestaTextoLibre);

          } else if (tipoPregunta == 'OPCIONSIMPLE') {
            let opcionTexto = this.form.get(c)?.value;
            let opcionId = this.obtenerOpcionSeleccionada(c, opcionTexto);
            let opcionSeleccionada = { OpcionID: opcionId, OpcionTexto: opcionTexto };

            const respuestaOpcionSimple: IRespuestaSimple = {
              RespuestaID: 0,
              FechaHoraContestada: fechaHoraContestada,
              Tipo: tipoPregunta,
              PreguntaID: +preguntaId,
              OpcionSeleccionada: opcionSeleccionada
            }

            textoRespuestas.push(respuestaOpcionSimple);
          }
          else if (tipoPregunta == 'OPCIONMULTIPLE') {
            let opcionesSeleccionadas = this.obtenerOpcionesSeleccionadas(c);

            const respuestaOpcionMultiple: IRespuestaMultiple = {
              RespuestaID: 0,
              FechaHoraContestada: fechaHoraContestada,
              Tipo: tipoPregunta,
              PreguntaID: +preguntaId,
              OpcionesSeleccionadas: opcionesSeleccionadas
            }
            textoRespuestas.push(respuestaOpcionMultiple);
          }
        }

      }

      const respuesta: IEncuestaContestada =
      {
        EncuestaID: this.encuesta.EncuestaID,
        Respuestas: textoRespuestas,
        Encuestado: encuestado,
      }

      console.log(JSON.stringify(respuesta));
      debugger
    }



    // if (this.encuesta != null) {
    //   const respuesta = new FeedbackEncuesta(this.encuesta.EncuestaID, textoRespuestas, encuestado);
    //   const resJSON = JSON.stringify(respuesta);

    //   this.guardarRespuesta(resJSON);

    //   this.encuestaFormDirective.resetForm();

    //   respuesta.Respuestas.filter(respuesta => {
    //     if (respuesta.Tipo == 'OPCIONMULTIPLE') {
    //       this.resetCheckboxes(respuesta.PreguntaID.toString());
    //     }
    //   });
    // }
  }

  guardarRespuesta(respuesta: string) {
    this._respuestaService.submitRespuesta(respuesta)
      .subscribe(response => {
        this.respuestaHttp = response.status
        if (this.respuestaHttp == 200) {
          this._messageService.showInfo('Se guardaron las respuestas. Gracias por participar', 'top right')
        }
      })
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


  ngOnChanges(changes: SimpleChanges) {
    this.form = this._pcs.toFormGroup(this.encuestado, this.preguntas as Pregunta[]);
  }

  chequeadas(): boolean {
    if (this.preguntas?.filter(pregunta => pregunta?.Requerida == true
      && pregunta.Tipo == 'OPCIONMULTIPLE'
      && pregunta?.Opciones?.filter(opcion => opcion.checked == true).length == 0).length == 0) {
      return true;
    } else {
      return false;
    }
  }


}




