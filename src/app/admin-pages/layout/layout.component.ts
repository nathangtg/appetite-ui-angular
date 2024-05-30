import { ThemeService } from './../../services/theme.service';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Restaurant {
  name: string;
  address: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet],
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
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (this.themeService.currentMode || prefersDarkScheme) {
      document.documentElement.classList.add('dark');
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
