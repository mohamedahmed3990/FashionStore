import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  loading: boolean = true;
  TotalAmount: number = 0;
  Carts: any[] = [];
  showConfirmDialog: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  trackByCart(index: number, item: any): number {
    return item.id ?? index;
  }

  getAllProducts(): void {
    this.loading = true;
    this.cartService.getAllProducts().subscribe({
      next: (data: any) => {
        
        console.log('Raw data:', data);

          this.Carts = data.items;

        console.log('Processed Carts:', this.Carts);
        this.applySavedQuantities();
        this.calculateTotal();
        this.loading = false;
      },
      error: (err) => {
        console.log('Error fetching products:', err);
        this.loading = false;
        this.Carts = [];
      },
    });
  }

  applySavedQuantities(): void {
    const storedQuantities = localStorage.getItem('cartQuantities');
    if (storedQuantities) {
      try {
        const cartQuantities: { [key: string]: number } = JSON.parse(storedQuantities);
        this.Carts.forEach(item => {
          if (cartQuantities[item.id]) {
            item.quantity = cartQuantities[item.id];
          }
        });
      } catch (e) {
        console.log('Error parsing cart quantities:', e);
      }
    }
  }

  calculateTotal(): void {
    this.TotalAmount = 0;
    this.Carts.forEach((cart) => {
      const price = Number(cart.price);
      const quantity = Number(cart.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        this.TotalAmount += price * quantity;
      }
    });
  }

  handleItemRemoved(productId: string): void {
    this.Carts = this.Carts.filter((item) => item.id !== productId);
    this.calculateTotal();
  }

  updateItemQuantity(event: { id: string, quantity: number }): void {
    const index = this.Carts.findIndex(item => item.id === event.id);
    if (index !== -1) {
      this.Carts[index].quantity = event.quantity;
      this.calculateTotal();
    }
  }

  getItemTotalPrice(item: any): number {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;
  }

  calculateTotalFromItems(): number {
    return this.Carts.reduce((total, item) => {
      return total + this.getItemTotalPrice(item);
    }, 0);
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.Carts = [];
        this.TotalAmount = 0;
        localStorage.removeItem('productsInCart');
        localStorage.removeItem('cartQuantities');
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      },
    });
  }

  openConfirmDialog(): void {
    this.showConfirmDialog = true;
  }

  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
  }

  confirmClearCart(): void {
    this.clearCart();
    this.closeConfirmDialog();
  }
  isArray(obj: any): boolean {
    return Array.isArray(obj);
  }
  
  // trackByCart(index: number, item: any): any {
  //   return item.id ?? index;
  // }
  
  
}
