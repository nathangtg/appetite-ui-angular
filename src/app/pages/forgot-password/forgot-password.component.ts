import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private accountService: AccountService) {}

  onSubmit() {
    this.accountService.sendPasswordResetEmail(this.email).subscribe({
      next: (response) => {
        this.message = 'Password reset link sent to your email.';
        this.isError = false;
      },
      error: (error) => {
        this.message = 'An error occurred. Please try again.';
        this.isError = true;
      },
    });
  }
}
