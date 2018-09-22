import { Component } from '@angular/core';
import { ClientServiceService } from './client-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AccentureTest';

  constructor(public http: ClientServiceService) {
  }

  registerResponse(){
  	this.http.registerResponse = null;  
  }

  loanResponse(){
  	this.http.loanResponse = null;
  }

}
