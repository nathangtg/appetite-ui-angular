import { ThemeService } from './../../../services/theme.service';
import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Restaurant {
  name: string;
  address: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class AdminLayoutComponent {
  sidebarOpen = false;
  restaurants: Restaurant[] = [
    { name: 'Restaurant A', address: '123 Main St' },
    { name: 'Restaurant B', address: '456 Oak St' },
    { name: 'Restaurant C', address: '789 Pine St' },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('account_type'));

    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    // if (this.themeService.currentMode || prefersDarkScheme) {
    //   document.documentElement.classList.add('dark');
    // }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Check if the user is a restaurant
  // Get the user's role from the token
  isRestaurant(): boolean {
    if (localStorage.getItem('account_type') === 'restaurant') {
      return true;
    } else {
      return false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
