import { Respuesta } from "./respuesta";

export class FeedbackEncuesta {
    public id: number;
    public EncuestaID: number;
    Denominacion!: string;
    FechaInicio!: string;
    FechaFin!: string;
    CantidadEncuestados!: number;
    Estado!: string;
    Objetivo!: string;
    public Respuestas: Respuesta<string>[];

    constructor(
        id: number,
        EncuestaID: number,
        // Denominacion: string,
        // FechaInicio: string,
        // FechaFin: string,
        // CantidadEncuestados: number,
        // Estado: string,
        // Objetivo: string,
        Respuestas: Respuesta<string>[]
    ) {
        this.id = id;
        this.EncuestaID = EncuestaID;
        // this.Denominacion = Denominacion;
        // this.FechaInicio = FechaInicio;
        // this.FechaFin = FechaFin;
        // this.CantidadEncuestados = CantidadEncuestados;
        // this.Estado = Estado;
        // this.Objetivo = Objetivo;
        this.Respuestas = Respuestas;
    }
    
    
};