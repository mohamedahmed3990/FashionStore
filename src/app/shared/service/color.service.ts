import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'https://localhost:7041/api/Color';
  private colorApiUrl = 'https://localhost:7041/api/Admin/AddColor';
  private deleteColorApiUrl = 'https://localhost:7041/api/Admin';
  private updateColorApiUrl = 'https://localhost:7041/api/Admin';

  constructor(private http: HttpClient) { }

  getColors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createColor(colorData: { Name: string, Hexa: string }): Observable<any> {
    return this.http.post(this.colorApiUrl, colorData);
  }

  deleteColor(id: number): Observable<any> {
    return this.http.delete(`${this.deleteColorApiUrl}/${id}`);
  }
  
  updateColor(id: number, colorData: { colorName: string, colorHexa: string }): Observable<any> {
    return this.http.put(`${this.updateColorApiUrl}/${id}`, colorData);
  }
}
