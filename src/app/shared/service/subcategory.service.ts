import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private apiUrl = 'https://localhost:7041/api/SubCategory/SubCatWithParent';
  private subcategoryApiUrl = 'https://localhost:7041/api/Admin/SubCategory';
  private deleteSubCategoryApiUrl = 'https://localhost:7041/api/Admin/SubCategory';
  private updateCategoryApiUrl = 'https://localhost:7041/api/Admin/Category';

  constructor(private http: HttpClient) { }

  getSubCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSubCategory(subcategoryData: { SubCategoryName: string, CategoryId: number}): Observable<any> {
    return this.http.post(this.subcategoryApiUrl, subcategoryData);
  }

  deleteSubCategory(id: number): Observable<any> {
    return this.http.delete(`${this.deleteSubCategoryApiUrl}/${id}`);
  }

  updateCategory(id: number, categoryData: { name: string}): Observable<any> {
    return this.http.put(`${this.updateCategoryApiUrl}/${id}`, categoryData);
  }
}
