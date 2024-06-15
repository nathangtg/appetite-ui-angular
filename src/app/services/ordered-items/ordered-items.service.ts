import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderedItemsService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  // Change status
  updateOrderedItem(
    restaurantId: string,
    orderId: string,
    orderedItemId: string,
    updateData: any
  ): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/order-items/${restaurantId}/${orderId}/${orderedItemId}/update`;

    return this.http.put(url, updateData, { headers });
  }
}
