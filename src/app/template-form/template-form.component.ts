import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  user: any={
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form);

    //console.log(this.user);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
