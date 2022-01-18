import { FormValidations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados?: Observable<EstadoBr[]> | any;
  cargos?: any[];
  tecnologias?: any[];
  newsletterOp?: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados; console.log(dados)});


    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],
      tecnologias: [null],
      newsletterOp: [null],
      termos:[null, Validators.pattern('true')],// utilizamos para validar uma expressão regular
      frameworks: this.buildFrameworhs()

    });
    //Validators.minLength(3), Validators.maxLength(20)
  }

  buildFrameworhs(){

    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.minSelectedCheckboxes(1));

  }

  //CÓDIGO PESQUISADO :/

  // minSelectedCheckboxes(min:number = 1) {
  //   const validator: ValidatorFn = (formArray: AbstractControl) => {
  //     if (formArray instanceof FormArray) {
  //       const totalSelected = formArray.controls
  //         .map((control) => control.value)
  //         .reduce((prev, next) => (next ? prev + next : prev), 0);
  //       return totalSelected >= min ? null : { required: true };
  //     }

  //     throw new Error('formArray is not an instance of FormArray');
  //   };

  //   return validator;
  // }

  // CÓDIGO INICIAL
  // requiredMinCheckbox(min: number = 1){
  //   const validator = (formArray: FormArray) => {
  //     // LÓGICA PARA UTILIZAR PROGRAMAÇAO ESTRUTURADA
  //     // const values = formArray.controls;
  //     // let totalChecked = 0;
  //     // for (let i=0; i<values.length; i++) {
  //     //   if (values[i].value){
  //     //     totalChecked +=1;
  //     //   }
  //     // }
  //     //PROGRAMAÇAO FUNCIONAL (REATIVA)
  //     const totalChecked = formArray.controls
  //     .map(v => v.value)
  //     .reduce((total, current) => current ? total + 1 : total, 0);
  //     //reduce - utilizado para fazer somatórias
  //     //(recebe dois parâmetros (valor corrente - se corrente for vdd retorno corrente + 1,)
  //     //segundo parametro é o valor inicial - nesse caso = 0)

  //     return totalChecked >= min ? null: { required: true};
  //   };
  //   return validator
  // }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    if (this.formulario.valid){
      this.http.post('https://httpbin.org/post',
      JSON.stringify(valueSubmit))
      .subscribe(dados => {
        console.log(dados);
        //reseta o form
        // this.formulario.reset();
        this.resetar();
      },
        (error: any) => alert('erro!'));
    } else {
      console.log('Formulário inválido!');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();

  }

  verificaValidTouched(campo: string) {

    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCep() {

    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)?.subscribe((dados) => this.populaDados(dados))
    }
    }


  populaDados(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }


  resetaDadosForm() {
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

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel && obj2.nivel): obj1 && obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java', 'python', 'flutter'])
  }

  getFrameworksControls(){
    return this.formulario.get('frameworks')? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }


}
