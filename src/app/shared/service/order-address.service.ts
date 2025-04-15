import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IOrderAddress } from '../interface/product-inerface';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class OrderAddressService {

  private apiUrl = 'https://localhost:7041/api/ProfileManager/Update-Address-Details';
  private fetchUrl = 'https://localhost:7041/api/ProfileManager/Address-Details';


  constructor(private http: HttpClient) {}

  putAddress(address: IOrderAddress): Observable<any> {
    const token = localStorage.getItem('eToken'); // Get token stored after login

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(this.apiUrl, address, { headers });
  }
  getAddress(): Observable<IOrderAddress | null> {
    const token = localStorage.getItem('eToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<IOrderAddress | null>(this.fetchUrl, { headers });
  }
}
