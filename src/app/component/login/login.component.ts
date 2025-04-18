import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../shared/service/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,  // Added by me from deepseek
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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

  //My Code From Deepseek ----------------------------------
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  msgError: string = '';
  isLoding: boolean = false;
  rememberMe: boolean = false;

  //  loginForm:FormGroup=new FormGroup({
  //     email:new FormControl(null,[Validators.required,Validators.email]),
  //     password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   });

  // Haidy Validator Code ------------------------------------

  // loginForm: FormGroup = this._FormBuilder.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!^(.)\1+$).{6,}$/
  //       ),
  //     ],
  //   ],
  // });

  // Haidy Code ------------------------------------

  // getDataForm(): void {
  //   if (this.loginForm.valid) {
  //     this.isLoding = true;
  //     this._AuthService.setLogin(this.loginForm.value).subscribe({
  //       next: (response) => {
  //         if (response.message == 'success') {
  //           this.isLoding = false;

  //           if (this.rememberMe) {
  //             localStorage.setItem('eToken', response.token);
  //           } else {
  //             sessionStorage.setItem('eToken', response.token);
  //           }

  //           this._AuthService.savrUserData();

  //           this._Router.navigate(['/home']);
  //         }
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.isLoding = false;
  //         this.msgError = err.error.message;
  //       },
  //     });
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

  // My Code From Deepseek------------------------------------
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this._AuthService.login(email!, password!, rememberMe!);
    }
  }

}
