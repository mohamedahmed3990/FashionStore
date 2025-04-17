import { Component, inject } from '@angular/core';
import { IWishlistItem } from '../../shared/interface/product-inerface';
import { WishlistService } from '../../shared/service/wishlist.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private wishlistService: WishlistService = inject(WishlistService);
  wishlistItems: IWishlistItem[] = this.wishlistService.getWishlist(); // Get wishlist items from the service

  // Method to remove an item from the wishlist
  removeItem(id: number): void {
    this.wishlistService.removeFromWishlist(id);
    this.wishlistItems = this.wishlistService.getWishlist();  // Refresh the wishlist
  }
}
