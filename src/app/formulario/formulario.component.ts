import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPregunta } from '../domain/pregunta';
import { ArmadoFormulario } from '../services/armado-formulario.service';
import { RespuestaService } from '../services/respuesta.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IEncuestaContestada, IEncuestado, IOpcionSeleccionada, IRespuesta, IRespuestaMultiple, IRespuestaSimple, IRespuestaTextoLibre } from '../domain/respuesta';
import { MessageService } from '../services/message.service';
import { IEncuesta } from '../domain/encuesta';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  providers: [ArmadoFormulario, ErrorStateMatcher]
})


export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() preguntas: IPregunta[] | null = [];
  @Input() encuesta!: IEncuesta | null;
  form!: FormGroup;
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
    private _armadoFormulario: ArmadoFormulario,
    private _respuestaService: RespuestaService,
    private _messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.form = this._armadoFormulario.toFormGroup(this.encuestado, this.preguntas as IPregunta[]);
  }

  onSubmit() {
    this.respuestas = JSON.stringify(this.form.getRawValue());
    this.feedback = this.form.value;
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
      this.armarRespuesta(textoRespuestas, encuestado);
    }
  }

  armarRespuesta(textoRespuestas: IRespuesta[], encuestado: IEncuestado) {
    if (this.encuesta) {
      const respuesta: IEncuestaContestada =
      {
        EncuestaID: this.encuesta.EncuestaID,
        Respuestas: textoRespuestas,
        Encuestado: encuestado,
      }
      const resJSON = JSON.stringify(respuesta);
      this.guardarRespuesta(resJSON);
      this.encuestaFormDirective.resetForm();
      this.resetCheckboxes();
    }
  }

  guardarRespuesta(respuesta: string) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this._respuestaService.submitRespuesta(respuesta)
      .subscribe(response => {
        this.respuestaHttp = response.status
        if (this.respuestaHttp == 200) {
          this._messageService.showInfo('Se guardaron las respuestas. Gracias por participar', 'top right')
        }
      })
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

  obtenerOpcionesSeleccionadas(c: string): IOpcionSeleccionada[] {
    const opcionesSeleccionadas: IOpcionSeleccionada[] = [];

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
    const pregunta = this.preguntas?.find(p => p.PreguntaID == +c);
    if (pregunta != null) {
      return pregunta.Tipo;
    } else {
      return ''
    }
  }


  ngOnChanges() {
    this.form = this._armadoFormulario.toFormGroup(this.encuestado, this.preguntas as IPregunta[]);
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

  resetCheckboxes() {
    this.preguntas?.forEach(p => {
      if (p.Tipo == 'OPCIONMULTIPLE') {
        p.Opciones.forEach(p => p.checked = false);
      }
    });
  }


}




