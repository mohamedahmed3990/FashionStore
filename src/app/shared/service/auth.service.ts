import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; // Added by Me from Deepseek

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7041/api/Account'; // Added by Me from Deepseek
  private currentUserSubject = new BehaviorSubject<any>(null); // Added by Me from Deepseek

  constructor(private _HttpClient:HttpClient , private Router_:Router ) { }

  userData:any;
  setRegister(userdata:object):Observable<any>{
   return this._HttpClient.post(`https://localhost:7041/api/Account/Register`,userdata,{
    headers:new HttpHeaders({'content-type':'application/json'})
   })
  }

  // Haidy Code

  // setLogin(userdata:object):Observable<any>{
  //   return this._HttpClient.post(`https://localhost:7041/api/Account/Login`,userdata,{
  //     headers:new HttpHeaders({'content-type':'application/json'})
  //   })
  //  }

  //  savrUserData(){
  //   if( localStorage.getItem('eToken')!=null){
  //     let encodeToken:any= localStorage.getItem('eToken');
  //     let decodeToken =jwtDecode(encodeToken);
  //     this.userData=decodeToken;
  //   }
   
  //  }

  //////////////////////////////////////////////////////////////////////////

  //My Code from Deepseek

  login(email: string, password: string, rememberMe: boolean) {
    return this._HttpClient.post<any>(`${this.apiUrl}/Login`, { email, password, rememberMe })
      .subscribe({
        next: (response) => {
          // Store tokens and user data
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('userRole', response.userRole);

          // Redirect based on role
          if (response.userRole === 'Admin') {
            this.Router_.navigate(['/admin-page']);
          } else {
            this.Router_.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error (show message to user)
        }
      });
  }

  // Haidy Code
   logout(){
    localStorage.removeItem('token');
    this.Router_.navigate(['/login'])
   }
}
