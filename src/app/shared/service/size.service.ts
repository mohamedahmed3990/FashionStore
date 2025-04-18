import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private apiUrl = 'https://localhost:7041/api/Size';
  private sizeApiUrl = 'https://localhost:7041/api/Admin/Size';
  private deleteSizeApiUrl = 'https://localhost:7041/api/Admin/Size';
  private updateSizeApiUrl = 'https://localhost:7041/api/Admin/Size';

  constructor(private http: HttpClient) { }

  getSizes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSize(colorData: { Name: string, Hexa: string }): Observable<any> {
    return this.http.post(this.sizeApiUrl, colorData);
  }

  deleteSize(id: number): Observable<any> {
    return this.http.delete(`${this.deleteSizeApiUrl}/${id}`);
  }

  updateSize(id: number, sizeData: { name: string}): Observable<any> {
    return this.http.put(`${this.updateSizeApiUrl}/${id}`, sizeData);
  }
}
