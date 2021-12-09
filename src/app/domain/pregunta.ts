export class Pregunta {
  value: string | undefined;
  id: string;
  textoPregunta: string;
  requerido: boolean;
  orden: number;
  tipo: string | undefined;
  
  opciones: { opcionId: number, value: string, checked: boolean }[];

  constructor(opciones: {
    value?: string;
    id?: string;
    textoPregunta?: string;
    requerido?: boolean;
    orden?: number;
    controlType?: string;
    opciones?: { opcionId: number, value: string, checked: boolean }[];
  } = {}) {
    this.value = opciones.value || undefined;
    this.id = opciones.id || '';
    this.textoPregunta = opciones.textoPregunta || '';
    this.requerido = !!opciones.requerido;
    this.orden = opciones.orden === undefined ? 1 : opciones.orden;
    this.tipo = opciones.controlType || '';
    this.opciones = opciones.opciones || [];
  }
}

