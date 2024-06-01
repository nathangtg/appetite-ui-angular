import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { NgClass } from '@angular/common';
import { Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-id-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet],
  templateUrl: './dashboard-id-layout.component.html',
  styleUrl: './dashboard-id-layout.component.css',
})
export class DashboardIdLayoutComponent {
  sidebarOpen = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit() {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    // if (this.themeService.currentMode || prefersDarkScheme) {
    //   document.documentElement.classList.add('dark');
    // }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  redirectToDashboard() {
    // Redirect to the dashboard
    this.router.navigate(['/admin/dashboard']);
  }
}
