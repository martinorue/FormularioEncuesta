export class Respuesta<T>{
    value: T | undefined;
    RespuestaID: number = 0;
    FechaHoraContestada: string;
    TipoPregunta: string | undefined;
    PreguntaID: number;
    
    constructor(fechaHoraContestada: string, tipoPregunta: string | undefined, preguntaID: number){
        this.FechaHoraContestada = fechaHoraContestada;
        this.TipoPregunta = tipoPregunta || undefined;
        this.PreguntaID = preguntaID;
        
    }
}

