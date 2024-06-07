import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  getOrdersByRestaurantAPI(restaurantId: string): Observable<any[]> {
    return this.http
      .get<{ orders: any[] }>(`${this.apiUrl}/orders/${restaurantId}`)
      .pipe(map((response) => response.orders));
  }

  getOrderByIdAPI(orderId: string, restaurantId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/orders/${restaurantId}/${orderId}`
    );
  }

  createOrderAPI(
    email: string,
    status: string,
    order_type: string,
    payment_method: string,
    payment_status: string,
    restaurantId: string,
    items: any
  ): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/orders/${restaurantId}/create`,
      { email, status, order_type, payment_method, payment_status, items },
      {
        headers,
      }
    );
  }
}
