import { IPregunta } from "./pregunta";

export interface IEncuesta {
    EncuestaID: number;
    Denominacion: string;
    FechaInicio: string;
    FechaFin: string;
    CantidadEncuestados: number;
    Estado: string;
    Objetivo: string;
    Preguntas: IPregunta[];
}