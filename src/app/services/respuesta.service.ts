import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestService {

  constructor(private http: HttpClient) { }

  submitRespuesta(respuesta: FeedbackEncuesta): Observable<FeedbackEncuesta> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<FeedbackEncuesta>('http://localhost:3000/respuestas', respuesta, httpOptions);
  }
}
