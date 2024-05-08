import { AccountService } from './../../services/account.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  registerResponse = {
    token: '',
  };

  registerError: string = '';

  confirmPassword: string = '';
  passwordsMismatch: boolean = false;
  registrationError: string = '';
  isLoading: boolean = false;

  constructor(private AccountService: AccountService) {}

  onSubmit() {
    this.isLoading = true;
    this.AccountService.onSignup(this.registerData).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        this.registerResponse = response;
        localStorage.setItem('token', this.registerResponse.token);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error during registration:', error);
        if (error.status === 422) {
          // Check if the error message indicates email already registered
          if (error.error && error.error.errors && error.error.errors.email) {
            this.registrationError = error.error.errors.email[0]; // Set the error message
          } else {
            this.registrationError =
              'An error occurred during registration. Please try again.';
          }
        } else {
          this.registrationError =
            'An error occurred during registration. Please try again later.';
        }
        this.isLoading = false;
      }
    );
  }
}
