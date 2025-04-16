import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserProfile } from '../interface/product-inerface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiGet='https://localhost:7041/api/ProfileManager/Personal-information';
  private apiUpdate='https://localhost:7041/api/ProfileManager/Update-Personal-information';


  constructor(private http : HttpClient) { }


getPersonalInfo():Observable<IUserProfile>
{
  const token = localStorage.getItem('eToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<IUserProfile>(this.apiGet,{headers})
}

putPersonalInfo(data: IUserProfile): Observable<any> {
  const token = localStorage.getItem('eToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.put(
    this.apiUpdate,
    data,
    { headers }
  );

}
}

