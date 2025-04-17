import { ProductComponent } from './../product/product.component';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../shared/service/wishlist.service';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-blank-nav',
  standalone: true,
  imports: [CommonModule,  RouterModule, FormsModule,ProductComponent , RouterModule],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.css'
})
export class BlankNavComponent implements OnInit {
  cartCount: number = 0;

constructor(private _AuthService:AuthService , private _Router:Router
  ,private wishlistService:WishlistService
, private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });  }

logoutUser():void{
  localStorage.removeItem('wishlist');
  localStorage.removeItem('currentUserId');  // Optionally clear other user-related data

  // Optionally, reset the wishlist in the service
  this.wishlistService.clearWishlist();
  this._AuthService.logout();
   }



}
