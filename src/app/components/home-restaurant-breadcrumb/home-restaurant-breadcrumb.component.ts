import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-restaurant-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './home-restaurant-breadcrumb.component.html',
  styleUrl: './home-restaurant-breadcrumb.component.css',
})
export class HomeRestaurantBreadcrumbComponent {
  @Input() restaurantName: string | null = null;
}
