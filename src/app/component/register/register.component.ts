import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../shared/service/auth.service';
import { Component, OnInit, OnDestroy, Renderer2  } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy{
  constructor(
    private renderer: Renderer2,
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Set body background color when RegisterComponent is active
    this.renderer.setStyle(document.body, 'background-color', '#f0f2f5');
  }

  ngOnDestroy(): void {
    // Optional: Reset it when navigating away
    this.renderer.removeStyle(document.body, 'background-color');
  }

  msgError: string = '';
  isLoding: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
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
      confirmPassword: [''],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (confirmPassword?.value === '') {
      confirmPassword?.setErrors({ required: true });
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  getDataForm(): void {
    if (this.registerForm.valid) {
      this.isLoding = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoding = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoding = false;
          this.msgError = err.error.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
