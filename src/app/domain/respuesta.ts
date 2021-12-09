export class Respuesta<T>{
    value: T | undefined;
    RespuestaID: number = 0;
    TipoPregunta: string | undefined;
    TextoRespuesta!: string;

    constructor(TextoRespuesta: string, TipoPregunta: string | undefined){
        this.TextoRespuesta = TextoRespuesta;
        this.TipoPregunta = TipoPregunta || undefined;
    }
}

