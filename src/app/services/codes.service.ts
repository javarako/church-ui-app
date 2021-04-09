import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstantsComponent } from '../global-constants/global-constants.component';

const baseUrl = GlobalConstantsComponent.apiURL + '/api/secure/codes';

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

  getAccountCodesByCommittee(committee): Observable<any> {
    return this.http.get(`${baseUrl}/accountCodesByCommittee/${committee}`);
  }

  getAllAccountCodes(): Observable<any> {
    return this.http.get(`${baseUrl}/allAccountCodes`);
  }
}
