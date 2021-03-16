import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstantsComponent } from '../global-constants/global-constants.component';

const AUTH_API = GlobalConstantsComponent.apiURL + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  resetPassword(username: string, oldPassword: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'resetPassword', {
      username,
      oldPassword,
      password
    }, httpOptions);
  }

}