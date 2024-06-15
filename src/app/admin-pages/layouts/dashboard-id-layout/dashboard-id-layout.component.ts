import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { NgClass } from '@angular/common';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-dashboard-id-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, RouterModule],
  templateUrl: './dashboard-id-layout.component.html',
  styleUrl: './dashboard-id-layout.component.css',
})
export class DashboardIdLayoutComponent {
  sidebarOpen = false;
  id: string | 'notFound' = 'notFound';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.id = this.route.snapshot.paramMap.get('id')!;
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

  redirectToOrders() {
    this.router.navigate(['orders'], { relativeTo: this.route });
  }
}
