import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { of, Subscription } from "rxjs";
import { delay } from 'rxjs/operators';
import { Router } from "@angular/router";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  authToken: any;
  user: any;
  tokenSubscription = new Subscription()
  timeout;

  constructor(private http: HttpClient, 
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  signOut(): void {
    this.tokenSubscription.unsubscribe();
    this.authToken = null;
    this.user = null;
    window.sessionStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    this.authToken = token;
    
    this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf();
    this.expirationCounter(this.timeout);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.user = user;
    //this.emit({ username: this.user.username });
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.signOut();
      this.router.navigate(["/login"]);
    });
  }
}