import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import 'rxjs';
import AlertContainer from 'react-alert-es6';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  msg : AlertContainer; 
  

  constructor(private http: ClientServiceService) {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.min(0), Validators.required], this.validateId.bind(this)),
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required, this.validatebirthdate.bind(this))
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    if(this.form.valid){
      this.http.createCustomer(this.form.value)
      .subscribe((data:any) => {
        this.http.registerResponse = data.mensaje;
        this.form.reset();
      }, err => this.http.registerResponse = err.error.mensaje
      );

    }

    
  }

  getErrorMessage(control:string) {
    if(this.form.get(control).hasError('required')){
      return 'Field required';
    }

    if(control == 'id'){
      if(this.form.get('id').hasError('min')) return 'It must be a positive value';
      if(this.form.get('id').hasError('exists')) return this.form.get('id').errors.exists;
    }

    if(control == 'birthdate'){
      if(this.form.get('birthdate').hasError('mayor')) return this.form.get('birthdate').errors.mayor;
    }

    return '';

  }

  validateId(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.existId(control.value)
      .subscribe(data => {
          //console.log(this.form);
          resolve(null);
        }, err => { resolve({ exists: err.error.mensaje }) });
    });
  }

  validatebirthdate(control: FormControl): Promise<any> {
    //console.log(control);
    return new Promise((resolve, reject) =>{
      this.http.validatebirthday(control.value)
      .subscribe(data =>{
        resolve(null);
      }, err => {
        //console.error(err);
        resolve({ mayor: err.error.mensaje })
      });
    })
  }

}

