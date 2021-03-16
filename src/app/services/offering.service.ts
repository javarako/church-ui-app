import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstantsComponent } from '../global-constants/global-constants.component';

const baseUrl = GlobalConstantsComponent.apiURL + '/api/secure/offerings';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  constructor(private http: HttpClient) { }
  
  getAll(params): Observable<any> {
    return this.http.get(baseUrl, { params });
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getDepositDetai(id): Observable<any> {
    return this.http.get(`${baseUrl}/depositDetail/${id}`);
  }

  saveDepositDetail(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${baseUrl}/depositDetail`, data,  { headers: headers, responseType: 'blob' });
  }
}
