import { Component } from '@angular/core';
import { PreguntaService } from './services/encuesta.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [PreguntaService]
})
export class AppComponent {

}
