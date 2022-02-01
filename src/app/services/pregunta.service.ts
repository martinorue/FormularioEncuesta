import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Pregunta } from '../domain/pregunta';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { Encuesta } from '../domain/encuesta';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(public httpClient: HttpClient) {
  }
  
  getPreguntas(id:number): Observable<Pregunta[]> {
    return this.getEncuesta(id)
    .pipe(encuesta => 
      encuesta.pipe(map(encuesta => encuesta.Preguntas.sort((a, b) => a.Orden - b.Orden))
    ));
  }

  getEncuesta(id:number): Observable<Encuesta>{
    return this.httpClient.get<Encuesta>(`${environment.baseUri}/api/EncuestasOpen?id=` + id);
  }

}
