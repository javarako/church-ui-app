import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstantsComponent } from '../global-constants/global-constants.component';

const baseUrl = GlobalConstantsComponent.apiURL + '/api/secure/attendances';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getByDate(params): Observable<any> {
    return this.http.get(baseUrl, { params });
  }

  getCount(params): Observable<any> {
    return this.http.get(`${baseUrl}/count`, { params });
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data): Observable<any> {
    return this.http.put(baseUrl, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteVisitor(params): Observable<any> {
    return this.http.delete(baseUrl, { params });
  }

  /*** 
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  ***/
}
