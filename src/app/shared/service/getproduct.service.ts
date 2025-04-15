import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GetproductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProduct(name:any):Observable<any>{
    // return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
    return this._HttpClient.get(`https://localhost:7041/api/ProductVariant/filter?category=${name}`)
  }
  // return this._HttpClient.get(`https://forkify-api.herokuapp.com/api/search?q=${name}`);


  getProductSortedPrice(name: any, sortBy: string): Observable<any> {
    return this._HttpClient.get(`https://localhost:7041/api/ProductVariant/filter?category=${name}&sortBy=${sortBy}`);
  }

  getProducfilter(name:any,sortBy:string,color: string, size: string, subCategory: string): Observable<any> {
    return this._HttpClient.get(
      `https://localhost:7041/api/ProductVariant/filter?category=${name}&sortBy=${sortBy}&color=${color}&size=${size}&subCategory=${subCategory}`
    );
  }
getProductDetilas(id:number):Observable<any>{
  return this._HttpClient.get(`https://localhost:7041/api/Product/details/${id}`)
}

 
}
