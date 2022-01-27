export class Pregunta {
  PreguntaID!: number;
  TextoPregunta!: string;
  Tipo!: string;
  Orden!: number;
  EncuestaID!: number | undefined;
  Requerida!: boolean;
  Opciones!: { OpcionID: number, OpcionTexto: string, checked: boolean }[];
  
  

  // constructor(opciones: {
  //   value?: string;
  //   preguntaId?: number;
  //   textoPregunta?: string;
  //   requerido?: boolean;
  //   orden?: number;
  //   controlType?: string;
  //   encuestaId?: number;
  //   opciones?: { OpcionId: number, OpcionTexto: string, checked: boolean }[];
  // } = {}) {
  //   this.value = opciones.value || undefined;
  //   this.PreguntaID = opciones.preguntaId;
  //   this.TextoPregunta = opciones.textoPregunta || '';
  //   this.Requerida = !!opciones.requerido;
  //   this.Orden = opciones.orden === undefined ? 1 : opciones.orden;
  //   this.Tipo = opciones.controlType || '';
  //   this.EncuestaID = opciones.encuestaId || undefined;
  //   this.Opciones = opciones.opciones || [];
  // }
}

