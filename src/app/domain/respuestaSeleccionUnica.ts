import { Respuesta } from "./respuesta";

export class RespuestaSeleccionUnica extends Respuesta<string>{
    OpcionSeleccionada: {OpcionID: number, OpcionTexto: string};

    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number, opcionesSeleccionadas: {OpcionID: number, OpcionTexto: string}){
        super(fechaHoraContestada, tipoPregunta, preguntaID);
        this.OpcionSeleccionada = opcionesSeleccionadas;
    }
}