import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import { Product, ProductApiResponse } from '../Utils/interface'
// import { environment } from '../../environments/environment.prod';
import { UsersService } from './users.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private ApiUrl = environment.apiUrl;
  private readonly products_URL = `${this.ApiUrl}/product`;
  private readonly all_Products_URL = `${this.ApiUrl}/product/all`;
  private readonly searchProduct_URL = `${this.ApiUrl}/product/search`;
  private readonly Categories_URL = `${this.ApiUrl}/category`;
  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }
  private getHeaders() {
    const token = this.usersService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getAllProducts() {
    return this.http.get(this.all_Products_URL, { headers: this.getHeaders() });
  }

  getProductsCategory(page: number, pageSize: number, categoryId: string = '') {
    let url = `${this.products_URL}/?page=${page}&limit=${pageSize}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    return this.http.get(url, { headers: this.getHeaders() });
  }

  searchByTitleInCategory(title: string, categoryId: string) {
    console.log('Searching for:', title, 'in category:', categoryId);
    if (categoryId == 'allProducts') {
      return this.http.get(`${this.all_Products_URL}`, { headers: this.getHeaders() });
    } else {
      return this.http.get(`${this.searchProduct_URL}?title=${title}&categoryId=${categoryId}`,
        { headers: this.getHeaders() }
      );
    }
  }

  getAllCategories() {
    return this.http.get(this.Categories_URL, { headers: this.getHeaders() });
  }
  
  getCategoryById(categoryId: string) {
    return this.http.get(`${this.Categories_URL}/${categoryId}`, { headers: this.getHeaders() });
  }
  
  getProductById(id: string) {
    return this.http.get(`${this.products_URL}/${id}`, { headers: this.getHeaders() });
  }
}

