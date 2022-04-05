export interface IPregunta {
  PreguntaID: number;
  TextoPregunta: string;
  Tipo: string;
  Orden: number;
  EncuestaID: number;
  Requerida: boolean;
  Opciones: IOpcion[];
  Resultados?: any;
  ResultadosML?: any;
}

export interface IOpcion {
  OpcionID: number;
  OpcionTexto: string;
}