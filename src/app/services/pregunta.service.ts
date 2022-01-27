import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Pregunta } from '../domain/pregunta';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { Encuesta } from '../domain/encuesta';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = 'http://localhost/BackendProyectoFinalAP/';
  private url_local = 'http://localhost:3000/encuestas';
  private url_azure = 'https://mr87187.azurewebsites.net/api/encuestas';

  constructor(public httpClient: HttpClient) {
  }
  
  getPreguntas(id:number): Observable<Pregunta[]> {
    return this.getEncuesta(id)
    .pipe(encuesta => 
      encuesta.pipe(map(encuesta => encuesta.Preguntas.sort((a, b) => a.Orden - b.Orden))
    ));
  }

  getEncuesta(id:number): Observable<Encuesta>{
    return this.httpClient.get<Encuesta>('https://mr87187.azurewebsites.net/api/EncuestasOpen?id=' + id);
  }

}
