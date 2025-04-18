import { Injectable } from '@angular/core';
import { IWishlistItem } from '../interface/product-inerface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: IWishlistItem[]=[];

  constructor()
  {
    const storedWishlist  = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
   }


   getWishlist(): IWishlistItem[]
   {
    return this.wishlist;
  }

  addToWishlist(item: IWishlistItem) {
    if (!this.wishlist.find(p => p.id === item.id)) {
      this.wishlist.push(item);
      this.saveWishlist();
    }
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== id);
    this.saveWishlist();
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.some(item => item.id === id);
  }

  clearWishlist(): void {
    this.wishlist = [];  // Clear wishlist array in memory
    localStorage.removeItem('wishlist');  // Remove wishlist from localStorage
  }

  private saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
  hasItems(): boolean {
    return this.wishlist.length > 0;
  }
}
