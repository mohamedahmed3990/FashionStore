import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalServiceService {
  constructor(private _HttpClient: HttpClient) {}
  userData:any;
  forget(userEmail: object): Observable<any> {
    return this._HttpClient.post(
      `https://localhost:7041/api/Account/forgot-password`,
      userEmail,{
            headers:new HttpHeaders({'content-type':'application/json'})
          })
    ;
  }
  // savrUserData(){
  //   if( localStorage.getItem('eToken')!=null){
  //     let encodeToken:any= localStorage.getItem('eToken');
  //     let decodeToken =jwtDecode(encodeToken);
  //     this.userData=decodeToken;
  //   }
   
  //  }

  newPass(resetPass: object): Observable<any> {
    return this._HttpClient.post(
      `https://localhost:7041/api/Account/reset-password`,
      resetPass,{
        headers:new HttpHeaders({'content-type':'application/json'})
      })
    ;
  }

   // resetCode(resetForm: object): Observable<any> {
  //   return this._HttpClient.post(
  //     `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
  //     resetForm
  //   );
  // }

  // newPass(resetPass: object): Observable<any> {
  //   return this._HttpClient.put(
  //     `https://localhost:7041/api/Account/reset-password`,
  //     resetPass
  //   );
  // }
}
