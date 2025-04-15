import { Component } from '@angular/core';
import { IOrderAddress } from '../../shared/interface/product-inerface';
import { OrderAddressService } from '../../shared/service/order-address.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-address',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './order-address.component.html',
  styleUrl: './order-address.component.css'
})
export class OrderAddressComponent {

  address: IOrderAddress = {
    country: '',
    city: '',
    addressDetails: ''
  };

  message = '';


  constructor(private addressService: OrderAddressService,private router:Router) {}

  submit() {
    this.addressService.putAddress(this.address).subscribe({
      next: (res) => {
        console.log('✅ Address updated:', res);
        this.message = 'Address updated successfully!';
        //this.address = { country: '', city: '', addressDetails: '' }; // reset form
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.message = 'Failed to update address.';
      }
    });
  }
}
