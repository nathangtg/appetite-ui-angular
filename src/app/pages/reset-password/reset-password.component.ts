import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ParamMap } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  token: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AccountService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token') || '';
    });

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.email = params.get('email') || '';
    });
  }

  onSubmit() {
    this.authService
      .resetPassword(
        this.token,
        this.email,
        this.password,
        this.password_confirmation
      )
      .subscribe({
        next: (response) => {
          this.message = 'Password reset successfully.';
          this.isError = false;
        },
        error: (error) => {
          this.message = 'An error occurred. Please try again.';
          this.isError = true;
        },
      });
  }
}
