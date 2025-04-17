import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../shared/service/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  msgError: string = '';
  isLoding: boolean = false;
  rememberMe: boolean = false;

  //  loginForm:FormGroup=new FormGroup({
  //     email:new FormControl(null,[Validators.required,Validators.email]),
  //     password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   });
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!^(.)\1+$).{6,}$/
        ),
      ],
    ],
  });

  getDataForm(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoding = false;
  
            const token = response.token;
  
            // ✅ حفظ التوكن
            if (this.rememberMe) {
              localStorage.setItem('eToken', token);
            } else {
              sessionStorage.setItem('eToken', token);
            }
  
            // ✅ حفظ بيانات المستخدم
            this._AuthService.savrUserData();
  
            // ✅ ✅ Migrate Basket from guest to logged-in user
            const guestId = localStorage.getItem('guest_basket_id');
            if (guestId) {
              const headers = new HttpHeaders({
                Authorization: `Bearer ${token}` 
              });
  
              this.http.post(`https://localhost:7041/Basket/migrate/${guestId}`, {}, { headers }).subscribe({
                next: () => {
                  localStorage.removeItem('guest_basket_id');
                },
                error: (err) => {
                  console.error('Error migrating basket:', err);
                }
              });
              
            }
  
            // ✅ توجيه المستخدم للصفحة الرئيسية أو اللي بعدها
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoding = false;
          this.msgError = err.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}
