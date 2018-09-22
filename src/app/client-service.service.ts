import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

	private url: string;
	public registerResponse: string;
  public loanResponse:string;

  constructor(private HttpClient: HttpClient) {
  	this.url = 'https://accenturetest.herokuapp.com/bank';
  }

  existId(id: number){
  	return this.HttpClient.post(this.url+'/validateId', {id: id});
  }

  createCustomer(obj: any){
  	return this.HttpClient.post(this.url+'/createCustomer', obj);
  }

  validatebirthday(date: Date){
  	return this.HttpClient.post(this.url+'/validatebirthdate', {date: date});
  }

  validateHiring(date: Date){
  	return this.HttpClient.post(this.url+'/validateEntryDate', {hiring: date});
  }

  loanrequest(obj: any){
  	return this.HttpClient.post(this.url+'/loan', obj);
  }

}
