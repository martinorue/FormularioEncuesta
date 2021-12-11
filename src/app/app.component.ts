import { Component, OnInit } from '@angular/core';

import { PreguntaService } from './services/pregunta.service';
import { Pregunta } from './domain/pregunta';
import { Observable, of } from 'rxjs';
import { PreguntaBD } from './domain/preguntaBD';
import { Encuesta } from './domain/encuesta';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  // template: `
  //   <div *ngIf="preguntas$">
  //     <h2>{{encuesta.Denominacion}}</h2>
  //     <div *ngIf="!preguntas$">
  //     <mat-spinner></mat-spinner>
  //     <h4>Cargando encuesta...</h4>
  //     </div>
  //   </div>
  //   <div>
  //     <app-dynamic-form [preguntas]="preguntas$ | async" ></app-dynamic-form>
  //   </div>
    
  // `,
  templateUrl: 'app.component.html',
  providers: [PreguntaService]
})
export class AppComponent implements OnInit {
  preguntas$!: Observable<Pregunta[]>;
  encuesta!: Encuesta;
  title = 'ejemplo-encuestas-dynamic-forms';

  constructor(private servicePregunta: PreguntaService) {

  }
  ngOnInit(): void {
    this.preguntas$ = this.servicePregunta.getPreguntas();

    this.servicePregunta.getEncuesta().subscribe(encuesta => this.encuesta = encuesta[0]);
  }





}
