import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './encuesta/encuesta.component';

export const routes: Routes = [
  {
    path: 'EncuestasOpen/0',
    redirectTo:'EncuestasOpen/1',
  },
  {
    path: 'EncuestasOpen/:id',
    component: EncuestaComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo:'EncuestasOpen/1',
    pathMatch: 'prefix'
  },
  {
    path: 'EncuestasOpen',
    redirectTo:'EncuestasOpen/1',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo:'EncuestasOpen/1',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
