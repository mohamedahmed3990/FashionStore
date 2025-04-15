import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalServiceService } from '../../shared/service/global-service.service';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(
    private _GlobalServiceService: GlobalServiceService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  // step3: boolean = false;
  email: string = '';
  msg: string = '';
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  
  forgetPass(): void {
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    this._GlobalServiceService.forget(userEmail).subscribe({
      next: (response) => {
        this.msg = response.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.msg = err.error.message;
      },
    });
  }
  
}
