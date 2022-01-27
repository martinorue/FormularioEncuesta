import { Component, OnInit } from '@angular/core';

import { PreguntaService } from './services/pregunta.service';
import { Pregunta } from './domain/pregunta';
import { Observable, of } from 'rxjs';
import { Encuesta } from './domain/encuesta';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  encuesta$!: Observable<Encuesta>;
  title = 'ejemplo-encuestas-dynamic-forms';

  constructor(private servicePregunta: PreguntaService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const encuestaIdFromRoute = Number(routeParams.get('id'));
    console.log(encuestaIdFromRoute);
    if(encuestaIdFromRoute > 0){
      this.preguntas$ = this.servicePregunta.getPreguntas(encuestaIdFromRoute);
      this.encuesta$ = this.servicePregunta.getEncuesta(encuestaIdFromRoute);
    }

  }





}
