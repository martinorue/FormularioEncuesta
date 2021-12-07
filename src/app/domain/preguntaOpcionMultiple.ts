import { Pregunta } from './pregunta';

export class PreguntaOpcionMultiple extends Pregunta<string> {
  override tipo = 'checkbox';
  type: string;
  checked: boolean;

  constructor(options: any) {
    super(options);
    this.type = options.type || '';
    this.checked = options.checked || false;
  }
}