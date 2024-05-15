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

  getMenuFromAPI(restaurantId: string): Observable<any[]> {
    return this.http
      .get<{ menus: any[] }>(`${this.apiUrl}/menus/${restaurantId}`)
      .pipe(map((response) => response.menus));
  }
}
