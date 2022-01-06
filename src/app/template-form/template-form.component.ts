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



  constructor(private http: HttpClient) { };

  ngOnInit(): any {

  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;;
  }

   aplicaCssErro( campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCep(cep: any, form: any){
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
     if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {

          this.resetaDadosForm(form);

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe((dados: any)=> this.populaDados(dados, form)) // subscribe se inscreve no link e passa pra data - que recebe o console.log

    }
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
