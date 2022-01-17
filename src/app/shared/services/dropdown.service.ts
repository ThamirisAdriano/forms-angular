import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get('assets/dados/estadosbr.json')
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'},
    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'python', desc: 'Python'},
      {nome: 'flutter', desc: 'Flutter'},
      {nome: 'ruby', desc: 'Ruby'},
    ]
  }

  getNewsletter(){
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'},
    ]
  }
}
