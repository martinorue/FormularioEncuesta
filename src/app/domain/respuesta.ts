export interface IEncuestaContestada {
    EncuestaID: number;
    Respuestas: IRespuesta[];
    Encuestado: IEncuestado;
}

export interface IEncuestado {
    PersonaId: number;
    Nombre: string;
    Correo: string;
    Celular: string;
}

export interface IRespuesta {
    RespuestaID: 0;
    FechaHoraContestada: string;
    Tipo: string;
    PreguntaID: number;
}

export interface IRespuestaTextoLibre extends IRespuesta {
    TextoRespuesta: string;
}

export interface IRespuestaSimple extends IRespuesta {
    OpcionSeleccionada: IOpcionSeleccionada;
}

export interface IRespuestaMultiple extends IRespuesta {
    OpcionesSeleccionadas: IOpcionSeleccionada[];
}

export interface IOpcionSeleccionada {
    OpcionID: number;
    OpcionTexto: string;
}