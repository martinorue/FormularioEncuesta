import { Component, OnInit } from '@angular/core';
import { PreguntaService } from './services/pregunta.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [PreguntaService]
})
export class AppComponent {
 
}
