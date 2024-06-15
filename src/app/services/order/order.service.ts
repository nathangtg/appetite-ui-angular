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
    const token = localStorage.getItem('token');

    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<{ orders: any[] }>(`${this.apiUrl}/orders/${restaurantId}`, {
        headers: header,
      })
      .pipe(map((response) => response.orders));
  }

  getOrdersByUserAPI(userId: string): Observable<any[]> {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<{ orders: any[] }>(`${this.apiUrl}/orders/user/${userId}`, {
        headers: header,
      })
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

  // Get ordered items
  getOrderedItemsAPI(restaurantId: string, orderId: string): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('Getting ordered items for order:', orderId);

    return this.http
      .get<{ items: any[] }>(
        `${this.apiUrl}/orders/${restaurantId}/${orderId}`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.items));
  }

  updateOrder(
    restaurantId: string,
    orderId: string,
    orderData: any
  ): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/orders/${restaurantId}/${orderId}/update`;

    return this.http.put<any>(url, orderData, { headers });
  }
}
