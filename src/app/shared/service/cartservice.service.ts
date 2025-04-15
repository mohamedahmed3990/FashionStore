// src/app/shared/service/cartservice.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../interface/product-inerface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  constructor(private _HttpClient: HttpClient) { }

  // إنشاء سلة جديدة بالمنتج المُضاف
  addToCart(product: IBasketItem): Observable<any> {
    let basketId = localStorage.getItem('basketId');
    if (!basketId) {
      basketId = uuidv4();
      localStorage.setItem('basketId', basketId);
    }

    const basket: IBasket = {
      id: basketId,
      items: [product]
    };

    return this._HttpClient.post('https://localhost:7041/api/Basket', basket);
  }

  // تحديث السلة القائمة مع دمج المنتجات
  updateCart(basket: IBasket): Observable<any> {
    return this._HttpClient.put('https://localhost:7041/api/Basket', basket);
  }

  // استرجاع السلة بناءً على basketId من الـ API
  getUserCart(basketId: string): Observable<any> {
    return this._HttpClient.get(`https://localhost:7041/api/Basket/${basketId}`);
  }

  // دالة مساعدة لاسترجاع سلة مبدئية من localStorage (تستخدم عند عدم استدعاء الـ API)
  getBasketFromLocalStorage(): IBasket | null {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      return { id: basketId, items: [] };
    }
    return null;
  }




 
    removeItem(ProductId:number):Observable<any>{
     return this._HttpClient.delete(`https://localhost:7041/api/Basket?id=${ProductId}`,
     )
    }
 
//     updateCartProduct(Idproduct:string  , newcount:number):Observable<any>{
//      return this._HttpClient.put(` https:ecommerce.routemisr.com/api/v1/cart/${Idproduct} `,
//        { count:newcount }
//      )
//     }
}


