import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IOrderAddress, IUserProfile } from '../../shared/interface/product-inerface';
import { CommonModule } from '@angular/common';
import { OrderAddressService } from '../../shared/service/order-address.service';
import { Router } from '@angular/router';
import { UserProfileService } from '../../shared/service/user-profile.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  user: IUserProfile = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userName: ''
  };

  isLoading = false;
  message = '';



  constructor(private _UserProfileService: UserProfileService) {}


  ngOnInit(): void {
    this._UserProfileService.getPersonalInfo().subscribe({
      next: (res) => {
        this.user = res;
        this.isLoading = false;
      },
      error: () => {
        this.message = '❌ Failed to load profile.';
        this.isLoading = false;
      }
    });
  }

  submit(): void {
    this._UserProfileService.putPersonalInfo(this.user).subscribe({
      next: () => {
        this.message = '✅ Profile updated successfully!';
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (err) => {
        console.log(err);

        this.message = '❌ Failed to update profile.';
      }
    });
  }
}
