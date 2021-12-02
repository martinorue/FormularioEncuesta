import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Pregunta } from '../domain/pregunta';
import { PreguntaControlService } from '../services/pregunta-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ PreguntaControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() preguntas: Pregunta<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: PreguntaControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.preguntas as Pregunta<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  ngOnChanges(changes: SimpleChanges){
    this.form = this.qcs.toFormGroup(this.preguntas as Pregunta<string>[]);
  }
}