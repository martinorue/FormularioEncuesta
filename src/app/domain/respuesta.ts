export class Respuesta<T>{
    value: T | undefined;
    RespuestaID: number = 0;
    FechaHoraContestada: string;
    Tipo: string | undefined;
    PreguntaID: number;
    //TextoRespuesta: string;
    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number){
        this.FechaHoraContestada = fechaHoraContestada;
        this.Tipo = tipoPregunta || undefined;
        this.PreguntaID = preguntaID;
    }
}

