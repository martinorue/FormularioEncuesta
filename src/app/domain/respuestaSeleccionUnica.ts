import { Respuesta } from "./respuesta";

export class RespuestaSeleccionUnica extends Respuesta<string>{
    TextoRespuesta!: string;
    
    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number, textoRespuesta: string){
        super(fechaHoraContestada, tipoPregunta, preguntaID);
        this.TextoRespuesta = textoRespuesta;
    }
}