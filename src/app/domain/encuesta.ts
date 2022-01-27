import { Pregunta } from "./pregunta";

export class Encuesta{
    EncuestaID!: number;
    Denominacion!: string;
    FechaInicio!: string;
    FechaFin!: string;
    CantidadEncuestados!: number;
    Estado!: string;
    Objetivo!: string;
    Preguntas!: Pregunta[];

    // constructor(EncuestaID: number, Preguntas: Pregunta[]){
    //     this.EncuestaID = EncuestaID;
    //     this.Preguntas = Preguntas;
    // }

}