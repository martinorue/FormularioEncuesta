import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeedbackEncuesta } from '../domain/feedbackEncuesta';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  token = localStorage.getItem('access_token')!;

  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgService) { }
  private url_local = 'http://localhost:3000/respuestas';
  private url_azure = 'https://mr87187.azurewebsites.net/api/ContestarOpen';

  submitRespuesta(respuesta: string): Observable<FeedbackEncuesta> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.post<FeedbackEncuesta>(this.url_azure, respuesta, httpOptions)
    .pipe(catchError(this.processHttpmsgService.handleError));
  }
}