import { RestaurantService } from './../../services/restaurant/restaurant.service';
import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/layout/layout.component';
import { NgFor, NgIf } from '@angular/common';
import { AdminRestaurantCardComponent } from '../../admin-components/admin-restaurant-card/admin-restaurant-card.component';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string;
  description: string;
  image_path: string;
  preparation_time: number;
  price_range: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminLayoutComponent,
    NgFor,
    AdminRestaurantCardComponent,
    NgIf,
    ActionButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurantsForAdmin().subscribe((response) => {
      console.log('Restaurants:', response);
      this.restaurants = response;
    });
  }

  redirectToCreateRestaurant(): void {
    window.location.href = '/admin/create-restaurant';
  }
}
