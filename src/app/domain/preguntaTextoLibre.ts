import { Pregunta } from '../domain/pregunta';

export class PreguntaTextoLibre extends Pregunta<string> {
  override controlType = 'textbox';
}