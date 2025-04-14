import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private Router_:Router ) { }

  userData:any;
  setRegister(userdata:object):Observable<any>{
   return this._HttpClient.post(`https://localhost:7041/api/Account/Register`,userdata,{
    headers:new HttpHeaders({'content-type':'application/json'})
   })
  }
  setLogin(userdata:object):Observable<any>{
    return this._HttpClient.post(`https://localhost:7041/api/Account/Login`,userdata,{
      headers:new HttpHeaders({'content-type':'application/json'})
    })
   }

   savrUserData(){
    if( localStorage.getItem('eToken')!=null){
      let encodeToken:any= localStorage.getItem('eToken');
      let decodeToken =jwtDecode(encodeToken);
      this.userData=decodeToken;
    }
   
   }
   logout(){
    localStorage.removeItem('eToken');
    this.Router_.navigate(['/login'])
   }
}
