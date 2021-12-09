import { Respuesta } from "./respuesta";

export class RespuestaOpcionMultiple extends Respuesta<string> {
    OpcionesSeleccionadas!: {OpcionID: number, OpcionTexto: string}[];

    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number, opcionesSeleccionadas: {OpcionID: number, OpcionTexto: string}[]){
        super(fechaHoraContestada, tipoPregunta, preguntaID);
        this.OpcionesSeleccionadas = opcionesSeleccionadas;
    }
}