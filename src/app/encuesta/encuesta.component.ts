import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../services/encuesta.service';
import { IPregunta } from '../domain/pregunta';
import { Observable } from 'rxjs';
import { IEncuesta } from '../domain/encuesta';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  preguntas$!: Observable<IPregunta[]>;
  encuesta$!: Observable<IEncuesta>;

  loading$ = this.loader.loading$;

  title = '';
  constructor(
    private _servicePregunta: PreguntaService,
    private _route: ActivatedRoute,
    public loader: LoadingService
  ) {
  }

  ngOnInit(): void {
    const routeParams = this._route.snapshot.paramMap;
    const encuestaIdFromRoute = Number(routeParams.get('id'));
    if (encuestaIdFromRoute > 0) {
      this.preguntas$ = this._servicePregunta.getPreguntas(encuestaIdFromRoute);
      this.encuesta$ = this._servicePregunta.getEncuesta(encuestaIdFromRoute);
    }
  }

}
