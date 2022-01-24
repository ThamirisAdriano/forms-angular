import { FormValidations } from './../form-validations';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() mostrarErro: boolean | undefined;
  @Input() msgErro: string | undefined;

  @Input() control : FormControl | undefined;
  @Input () label : string | any

  constructor() { }

  ngOnInit(): void {

  }

  get errorMessage(){

    for (const propertyName in this.control?.errors){
      if (this.control?.errors.hasOwnProperty(propertyName) &&
      this.control.touched) {
        //to do
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
    }
    }

    return null;
    }


}
