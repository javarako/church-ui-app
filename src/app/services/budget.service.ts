import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  get(year): Observable<any> {
    return this.http.get(`${baseUrl}/${year}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  upload(year, data): Observable<any> {
    return this.http.post(`${baseUrl}/${year}`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
