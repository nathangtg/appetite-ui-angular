import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuService } from './services/menu/menu.service';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { NgFor, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RestaurantCardComponent,
    HeaderComponent,
    MenuCardComponent,
    NgFor,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

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
