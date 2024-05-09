import { Component } from '@angular/core';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RestaurantCardComponent, HeaderComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {}
