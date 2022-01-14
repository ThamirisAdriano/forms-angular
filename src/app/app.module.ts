import { FormPocModule } from './form-poc/form-poc.module';
import { DataFormModule } from './data-form/data-form.module';
import { HttpClientModule } from '@angular/common/http';
import { TemplateFormModule } from './template-form/template-form.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateFormModule,
    HttpClientModule,
    DataFormModule,
    FormPocModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
