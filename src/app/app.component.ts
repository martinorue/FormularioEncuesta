import { Component, OnInit } from '@angular/core';

import { PreguntaService } from './services/pregunta.service';
import { Pregunta } from './domain/pregunta';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreguntaBD } from './domain/preguntaBD';
import { PreguntaSeleccionUnica } from './domain/preguntaSeleccionUnica';
import { PreguntaTextoLibre } from './domain/preguntaTextoLibre';
@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Ejemplo Encuesta</h2>
      <app-dynamic-form [preguntas]="preguntas$ | async"></app-dynamic-form>
    </div>
  `,
  //templateUrl: 'app.component.html',
  providers: [PreguntaService]
})
export class AppComponent implements OnInit{
  preguntas$!: Observable<Pregunta<any>[]>;

  constructor(private servicePregunta: PreguntaService) {
    
  }
  ngOnInit(): void {
    this.preguntas$ = this.servicePregunta.getPreguntas();
  }

  



}
