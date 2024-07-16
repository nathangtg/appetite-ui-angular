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
  loginSuccess: string = '';

  constructor(private AccountService: AccountService) {}

  onSubmit() {
    this.AccountService.onLogin(this.loginData).subscribe(
      (response: any) => {
        this.loginResponse = response;

        localStorage.setItem('token', this.loginResponse.token);
        localStorage.setItem(
          'account_type',
          this.loginResponse.user.account_type
        );

        this.loginSuccess = 'Login successful!';

        // Redirect to dashboard
        window.location.href = '/restaurants';

        this.loginError = '';
      },
      (error) => {
        this.loginError = 'Invalid email or password. Please try again.';
        this.loginSuccess = '';
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
    localStorage.removeItem('token');
    localStorage.removeItem('account_type');
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [AccountService],
})
export class AppModule {}
