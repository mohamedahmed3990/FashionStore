import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../shared/service/global-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  constructor(private _GlobalServiceService:GlobalServiceService,private _Router:Router,private _ActivatedRoute:ActivatedRoute){}
   resetData:object={};
  etoken:string='';
  email: string = '';
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      this.etoken = params['token'] || '';
    });
  }
  msg: string = '';
  step1: boolean = true;

  resetPassForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!^(.)\1+$).{6,}$/),
    ]),
  });
  onSubmit(): void {
    const resetData = {
      email: this.email,
      token: this.etoken,
      newPassword: this.resetPassForm.value.newPassword
    };
    console.log('Sending reset data:', resetData)
    this._GlobalServiceService.newPass(resetData).subscribe({
      next: (res) => {
        console.log('Password reset successful');
        this._Router.navigate(['/home']).then(navResult => {
          console.log('Navigation result:', navResult);
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    },
    error: (err) => {
      console.error('Error details:', err); // More detailed error logging
      this.msg = err.error.message;
    },
    complete: () => {
      console.log('Request completed'); // Check if this fires
    }
  });
  }
  
// resetPss(): void {
//     let resetPass = this.resetPassForm.value;
//     resetPass.email = this.email;
//     this._GlobalServiceService.newPass(this.resetData).subscribe({
//       next: (res) => {
       
//           console.log(this.resetData);
          
//           // localStorage.setItem('eToken', res.token);
//           this._Router.navigate(['/home']);
        
//       },
//       error: (err) => {
//         this.msg = err.error.message;
//       },
//     });
//   }
}
