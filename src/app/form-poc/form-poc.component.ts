import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-poc',
  templateUrl: './form-poc.component.html',
  styleUrls: ['./form-poc.component.scss']
})
export class FormPocComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    });
  }

  onSubmit() {
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log(dados);
      //reseta o form
      this.formulario.reset();
    },
    (error: any) => alert('erro'))
  }

  resetar(){
    this.formulario.reset()
  }

  verificaValidTouched(campo: string) {

    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  verificaEmailInvalido() {

    let campoEmail = this.formulario.get('email')

    if (campoEmail?.errors){
      return campoEmail?.errors.required && campoEmail?.touched;
    }
  }

  aplicaCssErro( campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCep(){

    let cep = this.formulario.get('endereco.cep')?.value
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep !='') {

      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){
        this.resetaDadosForm();

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => this.populaDadosForm(dados));

      }

    }
  }

  populaDadosForm(dados: any){

    this.formulario.patchValue({
     endereco: {
       rua: dados.logradouro,
       //cep: dados.cep,
       complemento: dados.complemento,
       bairro: dados.bairro ,
       cidade: dados.localidade,
       estado: dados.uf
     }
   });
 }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}



