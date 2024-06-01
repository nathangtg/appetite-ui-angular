import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;
  restaurantId: number = 0;

  // ! User Services
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

  redirectToSpecific() {
    window.location.href = `restaurants/${this.restaurantId}`;
  }

  // ! Admin Services
  getRestaurantsForAdmin() {
    // Pass in authorization bearer
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<any>(`${this.apiUrl}/admin/restaurants`, { headers })
      .pipe(
        tap((response) => console.log('API Response:', response)),
        map((response) => response)
      );
  }

  getSpecificRestaurantForAdmin(restaurantId: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/admin/restaurants/${this.restaurantId}`;

    return this.http.get(url, { headers });
  }

  createRestaurant(restaurant: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/create/restaurants`, restaurant, {
      headers,
    });
  }

  editRestaurant(restaurant: any, restaurantId: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.restaurantId = restaurantId;

    return this.http.put(
      `${this.apiUrl}/update/restaurants/${this.restaurantId}`,
      restaurant,
      { headers }
    );
  }

  editRestaurantImage(restaurantId: number, formData: FormData) {
    console.log(formData);
    console.log('Services Triggered');

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      `${this.apiUrl}/upload/restaurants/${restaurantId}`,
      formData,
      { headers }
    );
  }
}
