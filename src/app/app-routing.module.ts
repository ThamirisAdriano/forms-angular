import { LoginComponent } from './login/login.component';
import { FormPocComponent } from './form-poc/form-poc.component';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
  { path: 'formPoc', component: FormPocComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teste', component: TesteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
