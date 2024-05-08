import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  onLogin(loginData: any) {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post(url, loginData);
  }
}
