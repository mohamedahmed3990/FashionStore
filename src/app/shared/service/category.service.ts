import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7041/api/ParentCategory';
  private categoryApiUrl = 'https://localhost:7041/api/Admin/Category';
  private deleteCategoryApiUrl = 'https://localhost:7041/api/Admin/Category';
  private updateCategoryApiUrl = 'https://localhost:7041/api/Admin/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createCategory(categoryData: { Name: string,}): Observable<any> {
    return this.http.post(this.categoryApiUrl, categoryData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.deleteCategoryApiUrl}/${id}`);
  }

  updateCategory(id: number, categoryData: { name: string}): Observable<any> {
    return this.http.put(`${this.updateCategoryApiUrl}/${id}`, categoryData);
  }
}
