import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  [x: string]: any;

  user: any={
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form);

    //console.log(this.user);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe(dados => {
      console.log(dados);
      form.form.reset();
    }); //transforma objeto JS em JSON
  }



  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
    ) { };

  ngOnInit(): any {

  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;;
  }

   aplicaCssErro( campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCep(cep: any, form: any){
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)
      .subscribe(dados => this.populaDados(dados, form));
    }
}

populaDados(dados: any, formulario: any){
 /* formulario.setValue({
    nome: formulario.value.nome,
    email: formulario.value.email,
    endereço: {
    rua: dados.logradouro,
    cep: dados.cep,
    numero: '',
    complemento: dados.complemento,
    bairro: dados.bairro ,
    cidade: dados.localidade,
    estado: dados.uf
    }
  });*/

  formulario.form.patchValue({
    endereço: {
      rua: dados.logradouro,
      //cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro ,
      cidade: dados.localidade,
      estado: dados.uf
    }
  });
}

resetaDadosForm(formulario: any){
  formulario.form.patchValue({
    endereço: {
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    }
  });
}

}
