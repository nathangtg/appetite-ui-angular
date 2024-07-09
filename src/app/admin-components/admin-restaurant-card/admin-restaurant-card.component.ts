import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  image_path: string;
  cuisine: string;
  description: string;
  preparation_time: number;
  price_range: string;
}

@Component({
  selector: 'app-admin-restaurant-card',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass],
  templateUrl: './admin-restaurant-card.component.html',
  styleUrl: './admin-restaurant-card.component.css',
})
export class AdminRestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  constructor(private router: Router) {}

  redirectToSpecificRestaurant() {
    console.log('Redirecting to restaurant with ID:', this.restaurant.id);
    // Implement the navigation logic here
    this.router.navigate(['admin/dashboard', this.restaurant.id]);
  }
}
