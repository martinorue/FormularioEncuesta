import { Pregunta } from '../domain/pregunta';

export class PreguntaTextoLibre extends Pregunta<string> {
  override tipo = 'textbox';
}