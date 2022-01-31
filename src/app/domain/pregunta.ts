export class Pregunta {
  PreguntaID!: number;
  TextoPregunta!: string;
  Tipo!: string;
  Orden!: number;
  EncuestaID!: number | undefined;
  Requerida!: boolean;
  Opciones!: { OpcionID: number, OpcionTexto: string, checked: boolean }[];
}

