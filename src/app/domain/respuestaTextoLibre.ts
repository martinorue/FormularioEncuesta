import { Respuesta } from "./respuesta";

export class RespuestaTextoLibre extends Respuesta<string>{
    TextoRespuesta!: string;
    
    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number, textoRespuesta: string){
        super(fechaHoraContestada, tipoPregunta, preguntaID);
        this.TextoRespuesta = textoRespuesta;
    }
}