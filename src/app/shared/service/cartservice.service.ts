import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Productcart } from '../interface/product-inerface';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private _HttpClient:HttpClient) { }
 cartNumber:any='';
 headers: any = { token: localStorage.getItem('eToken') };
  // , selectedSize:string belong osizw
  addToCart(product: Productcart): Observable<any> {
    const basket = {
      id: localStorage.getItem('basketId') || 'basket_1',
      items: [product]
    };
  
    return this._HttpClient.post('https://localhost:7041/api/Basket', basket);
  }
  

 
     getUserCart() : Observable<any>{
   return this._HttpClient.get('https://localhost:7041/api/Basket',
   )
 }
 
    removeItem(ProductId:string):Observable<any>{
     return this._HttpClient.delete(`https:ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
     )
    }
 
    updateCartProduct(Idproduct:string  , newcount:number):Observable<any>{
     return this._HttpClient.put(` https:ecommerce.routemisr.com/api/v1/cart/${Idproduct} `,
       { count:newcount }
     )
    }
}


