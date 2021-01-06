import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/codes';

export  interface OptionValue {
  id: number;
  type: string;
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  constructor(private http: HttpClient) { }

  get(type): Observable<any> {
    return this.http.get(`${baseUrl}/referenceCode/${type}`);
  }

  getAccountCode(code): Observable<any> {
    return this.http.get(`${baseUrl}/account/${code}`);
  }

}
