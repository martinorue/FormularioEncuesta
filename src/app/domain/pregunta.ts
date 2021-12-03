export class Pregunta<T> {
  value: T | undefined;
  id: string;
  textoPregunta: string;
  required: boolean;
  orden: number;
  tipo: string;
  type: string;
  options: { key: string, value: string }[];

  constructor(options: {
    value?: T;
    id?: string;
    textoPregunta?: string;
    required?: boolean;
    orden?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.id = options.id || '';
    this.textoPregunta = options.textoPregunta || '';
    this.required = !!options.required;
    this.orden = options.orden === undefined ? 1 : options.orden;
    this.tipo = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}