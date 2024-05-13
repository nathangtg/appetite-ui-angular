import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;
  restaurantId: number = 0;

  getRestaurants() {
    const url = `${this.apiUrl}/restaurants`;
    return this.http.get(url);
  }

  getSpecificRestaurant(restaurantId: number) {
    const url = `${this.apiUrl}/restaurants/${this.restaurantId}`;
    return this.http.get(url);
  }
}
