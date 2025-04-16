import { Component, OnInit } from '@angular/core';
import { IOrderAddress } from '../../shared/interface/product-inerface';
import { Router } from '@angular/router';
import { OrderAddressService } from '../../shared/service/order-address.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-address',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './my-address.component.html',
  styleUrl: './my-address.component.css'
})
export class MyAddressComponent implements OnInit {

  address: IOrderAddress = {
    country: '',
    city: '',
    addressDetails: ''
  };

  message = '';
  formMessage: string = '';
  statusMessage: string = '';
  isLoading = true;
  showForm = false;
  addressExists = false;

  constructor(private addressService: OrderAddressService,private router:Router) {}

  ngOnInit(): void {
    this.addressService.getAddress().subscribe({
      next: (res) => {
        if (res && (res.country || res.city || res.addressDetails)) {
          this.address = res;
          this.addressExists = true;

          this.showForm = true;
        } else {
          this.addressExists = false;
          this.message = 'No address found.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Failed to fetch address:', err);
        this.message = 'Error loading address.';
        this.isLoading = false;
      }
    });
  }

  enableForm() {
    this.showForm = true;
  }



  submit() {
    this.addressService.putAddress(this.address).subscribe({
      next: (res) => {
        console.log('✅ Address updated:', res);
        this.formMessage = '✅ Address saved successfully!';
        this.addressExists = true;
        setTimeout(() => {
          this.formMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.formMessage = '❌ Failed to save address. Please try again.';
      }
    });
  }
}


