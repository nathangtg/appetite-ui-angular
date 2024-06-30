import { Component } from '@angular/core';
import { OrderListComponent } from '../../admin-components/order-list/order-list.component';
import { RevenueComponent } from '../../admin-components/revenue/revenue/revenue.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [OrderListComponent, RevenueComponent, LoadingComponent, NgIf],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css',
})
export class OrderAdminComponent {
  constructor() {}
}
