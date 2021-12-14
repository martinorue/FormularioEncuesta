import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormPreguntaComponent } from './dynamic-form-pregunta/dynamic-form-pregunta.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { PreguntaService } from './services/pregunta.service';
import { PreguntaControlService } from './services/pregunta-control.service';

import { HttpClientModule } from '@angular/common/http';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Angular Material*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

/*Responsive*/
import { FlexLayoutModule } from '@angular/flex-layout';



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
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [
    PreguntaService,
    PreguntaControlService,
    ProcessHttpmsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
