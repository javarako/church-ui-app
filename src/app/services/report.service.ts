import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://' + location.hostname + ':8081/api/secure/report';

export  interface ReportParam {
  type: string;
  fromDate: Date;
  toDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  financialReport(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${baseUrl}/finance`, data,  { headers: headers, responseType: 'blob' });
  }

  offeringReport(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'text/csv');
    return this.http.post(`${baseUrl}/offering`, data,  { headers: headers, responseType: 'blob' });
  }

  expenditureReport(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'text/csv');
    return this.http.post(`${baseUrl}/expenditure`, data,  { headers: headers, responseType: 'blob' });
  }
}
