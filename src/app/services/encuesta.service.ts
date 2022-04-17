import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IPregunta } from '../domain/pregunta';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEncuesta } from '../domain/encuesta';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(public httpClient: HttpClient) {
  }

  getPreguntas(id: number): Observable<IPregunta[]> {
    return this.getEncuesta(id)
      .pipe(encuesta =>
        encuesta.pipe(map(encuesta => encuesta.Preguntas.sort((a, b) => a.Orden - b.Orden))
        ));
  }

  getEncuesta(id: number): Observable<IEncuesta> {
    return this.httpClient.get<IEncuesta>(`${environment.baseUri}/api/EncuestasOpen?id=` + id);
  }

}
