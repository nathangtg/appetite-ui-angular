import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  // getMenuFromAPI(restaurantId: string): Observable<any[]> {
  //   return this.http
  //     .get<{ menus: any[] }>(`${this.apiUrl}/menus/${restaurantId}`)
  //     .pipe(map((response) => response.menus));
  // }

  getMenuFromAPI(
    restaurantId: string
  ): Observable<{ name: string; menus: any[] }> {
    return this.http.get<{ name: string; menus: any[] }>(
      `${this.apiUrl}/menus/${restaurantId}/client`
    );
  }

  getMenuFromClientAPI(
    restaurantId: string
  ): Observable<{ name: string; menus: any[] }> {
    return this.http.get<{ name: string; menus: any[] }>(
      `${this.apiUrl}/menus/${restaurantId}`
    );
  }

  getRestaurantFromAPI(restaurantId: string): Observable<any> {
    return this.http.get<{
      name: string;
      menus: any[];
      description: string;
      price_range: string;
      cuisine: string;
      address: string;
    }>(`${this.apiUrl}/restaurants/${restaurantId}`);
  }
}
