import { Component } from '@angular/core';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RestaurantCardComponent, HeaderComponent, NgFor, CommonModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.fetchRestaurants();
    console.log('Restaurants', this.restaurants);
  }

  restaurants: any[] = [];

  fetchRestaurants() {
    this.restaurantService.getRestaurantsFromAPI().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
        console.log(this.restaurants); // Log restaurants after they are fetched
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
}
