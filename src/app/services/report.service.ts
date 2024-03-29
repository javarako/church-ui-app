import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstantsComponent } from '../global-constants/global-constants.component';

const baseUrl = GlobalConstantsComponent.apiURL + '/api/secure/report';

export  interface ReportParam {
  type: string;
  fromDate: Date;
  toDate: Date;
  allMember?: boolean;
  offeringNo?: string;
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

  offeringTaxReceipt(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${baseUrl}/taxreceipt`, data,  { headers: headers, responseType: 'blob' });
  }

  expenditureReport(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'text/csv');
    return this.http.post(`${baseUrl}/expenditure`, data,  { headers: headers, responseType: 'blob' });
  }
}
