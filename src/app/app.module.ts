import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormPreguntaComponent } from './dynamic-form-pregunta/dynamic-form-pregunta.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { PreguntaService } from './services/pregunta.service';
import { PreguntaControlService } from './services/pregunta-control.service';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DynamicFormPreguntaComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PreguntaService,
    PreguntaControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
