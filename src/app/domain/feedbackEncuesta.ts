import { IEncuestado } from "./encuestado";
import { Respuesta } from "./respuesta";

export class FeedbackEncuesta {
    public EncuestaID: number;
    Denominacion!: string;
    FechaInicio!: string;
    FechaFin!: string;
    CantidadEncuestados!: number;
    Estado!: string;
    Objetivo!: string;
    public Respuestas: Respuesta<string>[];
    Encuestado: IEncuestado;

    constructor(
        EncuestaID: number,
        Respuestas: Respuesta<string>[],
        Encuestado: IEncuestado
    ) {
        this.EncuestaID = EncuestaID;
        this.Respuestas = Respuestas;
        this.Encuestado = Encuestado;
    }
    
};

export interface IFeedbackEncuesta {
  EncuestaID: number;
  Respuestas: IRespuesta[];
  Encuestado: IEncuestado;
}

export interface IRespuesta {
  RespuestaID: number;
  FechaHoraContestada: string;
  Tipo: string;
  PreguntaID: number;
  TextoRespuesta: string;
  OpcionSeleccionada: IOpcionSeleccionada;
  OpcionesSeleccionadas: IOpcionSeleccionada[];
}

export interface IOpcionSeleccionada {
  OpcionID: number;
  OpcionTexto: string;
}