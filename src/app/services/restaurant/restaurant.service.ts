import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;
  restaurantId: number = 0;

  getRestaurantsFromAPI() {
    return this.http.get<any>(`${this.apiUrl}/restaurants`).pipe(
      tap((response) => console.log('API Response:', response)), // Log the entire response object
      map((response) => response) // Map the response to the restaurants array
    );
  }

  getSpecificRestaurant(restaurantId: number) {
    const url = `${this.apiUrl}/restaurants/${this.restaurantId}`;
    return this.http.get(url);
  }
}
