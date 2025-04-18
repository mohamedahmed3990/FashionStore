import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProduct {

  constructor(private http: HttpClient) { }

  // Add a new product along with its variants
  addProduct(product: any): Observable<any> {
    return this.http.post('https://your-api-endpoint/products', product);
  }
}

