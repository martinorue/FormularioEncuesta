import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  constructor(private http: HttpClient, private processHttpmsgService: ProcessHttpmsgService) { }

  submitRespuesta(respuesta: string): Observable<HttpResponse<string>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'body'
    };
    return this.http.post<HttpResponse<string>>(`${environment.baseUri}/api/ContestarOpen`, respuesta, httpOptions)
      .pipe(catchError(this.processHttpmsgService.handleError));
  }
}