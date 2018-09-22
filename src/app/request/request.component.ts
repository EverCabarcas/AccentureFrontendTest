import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { ClientServiceService } from '../client-service.service';
import 'rxjs';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  form: FormGroup;

  constructor(private http: ClientServiceService) {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      nit: new FormControl(null, Validators.required),
      salary: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100000000)]),
      hiring:  new FormControl(null, Validators.required, this.validatehiring.bind(this))
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.form.valid){
      this.http.loanrequest(this.form.value)
      .subscribe((data:any) =>{
        this.http.loanResponse = data.mensaje
      }, err =>{
        this.http.loanResponse = err.error.mensaje
      })
    }
  }

  getErrorMessage(control:string) {
    if(this.form.get(control).hasError('required')){
      return 'Field required';
    }

    if(control == 'salary'){
      if(this.form.get('salary').hasError('min')) return 'It must be a positive value';
      if(this.form.get('salary').hasError('max')) return 'The salary must be less than 100.000.000';
    }

    if(control == 'hiring'){
      if(this.form.get('hiring').hasError('enter')) return this.form.get('hiring').errors.enter;
    }

    return '';

  }

  validatehiring(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(this.form);
      this.http.validateHiring(control.value)
      .subscribe(data => {

        resolve(null);
      }, err => { 
        console.log(err);
        resolve({ enter: err.error.mensaje });
      });
    });
  }

}
