import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  onSignup(registerData: any) {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post(url, registerData);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getProfile() {
    const url = `${this.apiUrl}/user`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };
    return this.http.get(url, options);
  }
}
