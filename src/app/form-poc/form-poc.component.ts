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

  usuario : any = {
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form.value);

   // console.log(this.usuario)
  }



  constructor() { }

  ngOnInit(): void {


}

  }
