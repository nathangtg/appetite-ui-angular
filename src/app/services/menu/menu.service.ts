import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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

  getMenuFromClientAPI(
    restaurantId: string
  ): Observable<{ name: string; menus: any[] }> {
    return this.http.get<{ name: string; menus: any[] }>(
      `${this.apiUrl}/menus/${restaurantId}/client`
    );
  }

  getMenuFromAPI(
    restaurantId: string
  ): Observable<{ name: string; menus: any[] }> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ name: string; menus: any[] }>(
      `${this.apiUrl}/menus/${restaurantId}`,
      { headers }
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

  getMenuItemsFromAPI(restaurantId: string | null): Observable<any[]> {
    return this.http
      .get<{ menuItems: any[] }>(`${this.apiUrl}/menuItems/${restaurantId}`)
      .pipe(map((response) => response.menuItems));
  }

  modifyMenuItemInAPI(
    restaurantId: string,
    menuId: string,
    formData: any
  ): Observable<any> {
    // Add headers
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(
      `${this.apiUrl}/menus/${restaurantId}/${menuId}/update`,
      formData,
      { headers }
    );
  }

  modifyImageInAPI(
    restaurantId: string,
    menuId: string,
    formData: FormData
  ): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle missing token scenario
      return throwError('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/menus/${restaurantId}/${menuId}/upload`;

    return this.http.post(url, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        return throwError('Failed to upload image');
      })
    );
  }
}
