import { Pregunta } from '../domain/pregunta';

export class PreguntaSeleccionUnica extends Pregunta<string> {
  override tipo = 'dropdown';
}