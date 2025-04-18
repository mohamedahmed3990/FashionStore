import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7041/api/Admin';
  private apiCatUrl = 'https://localhost:7041/api/ParentCategory';
  private apiSubCatUrl = 'https://localhost:7041/api/SubCategory';
  private apiDelProduct = 'https://localhost:7041/api/Admin/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProduct(product: FormData): Observable<any> {
    return this.http.post(this.apiUrl, product, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiDelProduct}/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiCatUrl}`);
  }

  getSubCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiSubCatUrl}`);
  }
}
