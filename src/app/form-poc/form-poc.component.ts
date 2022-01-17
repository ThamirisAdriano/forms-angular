import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-poc',
  templateUrl: './form-poc.component.html',
  styleUrls: ['./form-poc.component.scss']
})
export class FormPocComponent implements OnInit {

  formulario!: FormGroup;
  estados?: EstadoBr[] | any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService) { }

  ngOnInit(): void {


    this.dropdownService.getEstadosBr()
    .subscribe(dados => {this.estados = dados; console.log(dados)});



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

    if (cep !=='' && cep != null) {
      this.cepService.consultaCep(cep)
      .subscribe(dados => this.populaDadosForm(dados));

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



