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

  // getPreguntas() {
  //   const result = this.getPreguntasBD();
  //   const preguntas = result.pipe(map((pregunta: PreguntaBD[]) => {
  //     let result: Pregunta<string>[] = [];
  //     if (pregunta) {
  //       pregunta.forEach((p) => {
  //         if (p.Tipo == 'TextoLibre') {
  //           result.push(new PreguntaTextoLibre({
  //             key: p.TextoPregunta,
  //             label: p.TextoPregunta,
  //             value: '',
  //             required: true,
  //             order: p.Orden
  //           }));
  //         } else if (p.Tipo == 'SeleccionUnica') {
  //           new PreguntaSeleccionUnica({
  //             key: p.TextoPregunta,
  //             label: p.TextoPregunta,
  //             options: [
  //               { key: 'solid', value: 'Solid' },
  //               { key: 'great', value: 'Great' },
  //               { key: 'good', value: 'Good' },
  //               { key: 'unproven', value: 'Unproven' }
  //             ],
  //             order: p.Orden,
  //             required: true
  //           });
  //         }
  //       });
  //     }
  //     console.log(result);
  //     return result.sort((a, b) => a.order - b.order);
  //   }))
  //   return preguntas;
  // }

  // getPreguntasBD(): Observable<PreguntaBD[]> {
  //   return this.httpClient.get<PreguntaBD[]>(this.url + 'api/PreguntasTextoLibre');
  // }


  getPreguntas(): Observable<Pregunta[]> {
    return this.getEncuesta()
    .pipe(encuesta => 
      encuesta.pipe(map(encuesta => encuesta[0].Preguntas.sort((a, b) => a.orden - b.orden))
    ));
  }

  getEncuesta(): Observable<Encuesta[]>{
    return this.httpClient.get<Encuesta[]>('http://localhost:3000/encuestas');
  }

}
