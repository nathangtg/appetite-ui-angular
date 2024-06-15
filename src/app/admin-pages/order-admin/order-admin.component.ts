import { Component } from '@angular/core';
import { OrderListComponent } from '../../admin-components/order-list/order-list.component';
import { RevenueComponent } from '../../admin-components/revenue/revenue/revenue.component';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [OrderListComponent, RevenueComponent],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css',
})
export class OrderAdminComponent {}
