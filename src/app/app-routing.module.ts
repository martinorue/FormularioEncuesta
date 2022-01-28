import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

export const routes: Routes = [
  {
    path: 'EncuestasOpen/:id',
    component: EncuestaComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo:'EncuestasOpen/1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
