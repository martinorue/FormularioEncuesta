import { Component, OnInit } from '@angular/core';

import { PreguntaService } from './services/pregunta.service';
import { Pregunta } from './domain/pregunta';
import { Observable, of } from 'rxjs';
import { PreguntaBD } from './domain/preguntaBD';
import { Encuesta } from './domain/encuesta';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Ejemplo Encuesta</h2>
      <app-dynamic-form [preguntas]="preguntas$ | async" ></app-dynamic-form>
    </div>
  `,
  //templateUrl: 'app.component.html',
  providers: [PreguntaService]
})
export class AppComponent implements OnInit{
  preguntas$!: Observable<Pregunta[]>;
  title = 'ejemplo-encuestas-dynamic-forms';

  constructor(private servicePregunta: PreguntaService) {
    
  }
  ngOnInit(): void {
    this.preguntas$ = this.servicePregunta.getPreguntas();
  }

  



}
