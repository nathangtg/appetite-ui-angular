import { AccountService } from '../../services/account/account.service';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    user: {
      account_type: '',
    },
  };

  loginError: string = '';

  constructor(private AccountService: AccountService) {}

  // onSubmit() {
  //   let token: string; // Declare token as a string variable
  //   const url = `${this.apiUrl}/auth/login`;
  //   this.http.post(url, this.loginData, { withCredentials: true }).subscribe(
  //     (response) => {
  //       console.log('Login successful:', response);
  //       this.loginResponse = response as any;
  //       token = this.loginResponse.token;
  //     },
  //     (error) => {
  //       console.error('Error during login:', error);
  //     }
  //   );
  // }

  // onSubmit() {
  //   this.AccountService.onLogin(this.loginData).subscribe((response: any) => {
  //     console.log('Login successful:', response);
  //     this.loginResponse = response;
  //     localStorage.setItem('token', this.loginResponse.token);
  //   });
  // }

  onSubmit() {
    this.AccountService.onLogin(this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.loginResponse = response;

        console.log('Token:', this.loginResponse.token);
        console.log('Account type:', this.loginResponse.user.account_type);

        localStorage.setItem('token', this.loginResponse.token);
        localStorage.setItem(
          'account_type',
          this.loginResponse.user.account_type
        );
      },
      (error) => {
        console.error('Error during login:', error);
        this.loginError = 'Invalid email or password. Please try again.'; // You can customize this error message based on your backend response
      }
    );
  }

  isLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem('token') !== null;
    }
    return false;
  }

  onLogout() {
    console.log('Logging out');
    console.log('Token:', localStorage.getItem('token'));
    localStorage.removeItem('token');
    localStorage.removeItem('account_type');
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [AccountService],
})
export class AppModule {}
