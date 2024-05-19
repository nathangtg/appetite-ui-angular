import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isNavbarOpen = false;

  constructor(private accountService: AccountService) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getInformation() {
    console.log('Getting profile data...');

    this.accountService.getProfile().subscribe(
      (response: any) => {
        console.log('Profile Data:', response);
        // You can process the response data here
      },
      (error) => {
        console.error('Error fetching profile data:', error);
        // Handle error scenario here
      }
    );
  }

  onLogout() {
    this.accountService.onLogout();
  }
}
