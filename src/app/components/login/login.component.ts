import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  apiUrl = environment.apiUrl;

  loginData = {
    email: '',
    password: '',
  };

  loginResponse = {
    token: '',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    let token: string; // Declare token as a string variable
    const url = `${this.apiUrl}/auth/login`;
    this.http.post(url, this.loginData, { withCredentials: true }).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.loginResponse = response as any;
        token = this.loginResponse.token;
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }

  isLoggedIn() {
    return this.loginResponse.token !== '';
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
})
export class AppModule {}
