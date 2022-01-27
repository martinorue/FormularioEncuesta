import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

export const routes: Routes = [
  {
    path: 'EncuestasOpen/:id',
    component: AppComponent
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
