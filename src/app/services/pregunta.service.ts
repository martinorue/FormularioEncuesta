import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Pregunta } from '../domain/pregunta';
import { Observable, of } from 'rxjs';
import { PreguntaBD } from '../domain/preguntaBD';
import {map} from 'rxjs/operators';
import { Encuesta } from '../domain/encuesta';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = 'http://localhost/BackendProyectoFinalAP/';

  constructor(public httpClient: HttpClient) {
  }
  
  getPreguntas(): Observable<Pregunta[]> {
    return this.getEncuesta()
    .pipe(encuesta => 
      encuesta.pipe(map(encuesta => encuesta[0].Preguntas.sort((a, b) => a.Orden - b.Orden))
    ));
  }

  getEncuesta(): Observable<Encuesta[]>{
    return this.httpClient.get<Encuesta[]>('https://mr87187.azurewebsites.net/api/encuestas');
  }
//http://localhost:3000/encuestas
  //
}
