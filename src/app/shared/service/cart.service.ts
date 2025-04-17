import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
// import { environment } from "../../../environments/environment.prod";
import { UsersService } from './users.service';
import { IBasket } from '../interface/product-inerface';
import { v4 as uuidv4 } from 'uuid';


interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  total: number;
}
interface CartResponse {
  cartItems: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private readonly apiUrl = 'https://localhost:7041';
  private readonly cart_URL = `${this.apiUrl}/api/Basket/`;
  private readonly addToCart_URL = `${this.apiUrl}/api/Basket/`;
  private readonly cartKey = 'productsInCart';

  // Create a BehaviorSubject to track cart count
  private _cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this._cartCount.asObservable();

  constructor(private http: HttpClient, public userService: UsersService) {
    // Listen for login state changes
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.updateCartCount();
      } else {
        this._cartCount.next(0);
      }
    });
  }

  // Method to update cart count
  updateCartCount() {
    if (this.userService.isLoggedIn()) {
      this.getAllProducts().subscribe({
        next: (response: any) => {
          const count = response.items?.length || 0;
          this._cartCount.next(count);
        },
        error: () => {
          this._cartCount.next(0);
        }
      });
    }
  }
  

  addProductToCart(basket: IBasket): Observable<any> {
    const token = this.userService.getToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    });
  
    return this.http.post<any>(this.cart_URL, basket, { headers }).pipe(
      tap(() => this.updateCartCount()),
      catchError(this.handleError)
    );
  }
  


  getAllProducts(): Observable<any> {
    const token = this.userService.getToken();
    const basketId = this.getBasketId();
  
    const headers = new HttpHeaders({
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  
    return this.http.get(`${this.cart_URL}${basketId}`, { headers });
  }
  

  removeFromCart(productId: string): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const removeUrl = `${this.cart_URL}remove/${productId}`;

    return this.http.delete(removeUrl, { headers }).pipe(
      tap(() => {
        // Update cart count immediately after removing product
        this.updateCartCount();
      }),
      catchError(this.handleError)
    );
  }
  clearCart(): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const basketId = this.getBasketId(); // 🟢 استخدم ID الباسكت
    const clearUrl = `${this.cart_URL}${basketId}`; // ✅ أضف الـ id للرابط
  
    return this.http.delete(clearUrl, { headers }).pipe(
      tap(() => {
        this._cartCount.next(0);
      }),
      catchError(this.handleError)
    );
  }
  


  // local storage Handler
  // Get all cart items
  getCartItems(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  // Add item to cart
  addToCart(itemId: number): void {
    const currentCart: number[] = this.getCartItems();

    if (!currentCart.includes(itemId)) {
      currentCart.push(itemId);
    }

    this.saveCart(currentCart);
  }

  // Remove item from cart
  removeItemsFromCart(itemId: number): void {
    const currentCart = this.getCartItems().filter(item => item.id !== itemId);
    this.saveCart(currentCart);
  }

  // Update item quantity
  updateQuantity(itemId: number, newQuantity: number): void {
    const currentCart = this.getCartItems();
    const item = currentCart.find(i => i.id === itemId);

    if (item) {
      item.quantity = newQuantity;
      this.saveCart(currentCart);
    }
  }

  // Clear the cart
  clearCartItems(): void {
    localStorage.removeItem(this.cartKey);
  }

  // Private method to save cart
  private saveCart(cartItems: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
  // Calculate total price
  calculateTotal(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('🛑 FULL ERROR RESPONSE:', error);
  
    // طباعة تفاصيل واضحة من السيرفر
    if (error.status === 400 && error.error) {
      console.warn('⚠️ SERVER MESSAGE:', error.error);
    }
  
    return throwError(() => new Error(error.error?.message || 'Something went wrong; please try again later.'));
  }
  
  
  getBasketId(): string {
    const userId = this.userService.getUserId();
    if (userId) return userId;
  
    let guestId = localStorage.getItem('guest_basket_id');
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem('guest_basket_id', guestId);
    }
    return guestId;
  }
  

}
