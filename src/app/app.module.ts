import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormPreguntaComponent } from './preguntas-dinamicas/preguntas-dinamicas.component';
import { DynamicFormComponent } from './formulario/formulario.component';
import { PreguntaService } from './services/encuesta.service';
import { ArmadoFormulario } from './services/armado-formulario.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

/*Angular Material*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { EncuestaComponent } from './encuesta/encuesta.component';
import { GetEncuestaInterceptor } from './interceptors/get-encuesta.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormPreguntaComponent,
    DynamicFormComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    PreguntaService,
    ArmadoFormulario,
    ProcessHttpmsgService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GetEncuestaInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
