import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

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
  selector: 'app-dashboard-id',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard-id.component.html',
  styleUrl: './dashboard-id.component.css',
})
export class DashboardIdComponent {
  restaurant: Restaurant | null = null;
  restaurantId: number | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    this.restaurantService.getRestaurantsForAdmin().subscribe((response) => {
      this.restaurant = response.find(
        (restaurant: Restaurant) => restaurant.id === this.restaurantId
      );
    });
  }
}
