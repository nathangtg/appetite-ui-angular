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
    const account_type = localStorage.getItem('account_type');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };
    return this.http.get(url, options);
  }

  sendPasswordResetEmail(email: string) {
    const url = `${this.apiUrl}/forgot-password`;
    return this.http.post(url, { email });
  }

  resetPassword(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    const url = `${this.apiUrl}/reset-password`;
    return this.http.post(url, {
      token,
      email,
      password,
      password_confirmation,
    });
  }

  updateProfile(profileData: any, profileId: string) {
    const url = `${this.apiUrl}/update/users/${profileId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(url, profileData, { headers });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  redirectToLogin() {
    window.location.href = 'auth/login';
  }
}
