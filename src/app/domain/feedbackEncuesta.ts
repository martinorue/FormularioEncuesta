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
        //id: number,
        EncuestaID: number,
        // Denominacion: string,
        // FechaInicio: string,
        // FechaFin: string,
        // CantidadEncuestados: number,
        // Estado: string,
        // Objetivo: string,
        Respuestas: Respuesta<string>[],
        Encuestado: IEncuestado
    ) {
        //this.id = id;
        this.EncuestaID = EncuestaID;
        // this.Denominacion = Denominacion;
        // this.FechaInicio = FechaInicio;
        // this.FechaFin = FechaFin;
        // this.CantidadEncuestados = CantidadEncuestados;
        // this.Estado = Estado;
        // this.Objetivo = Objetivo;
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