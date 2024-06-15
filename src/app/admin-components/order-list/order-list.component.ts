import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { FormsModule } from '@angular/forms';
import { OrderedItemsService } from '../../services/ordered-items/ordered-items.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ToastComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private orderedItemsService: OrderedItemsService
  ) {}

  restaurantId: string | 'notFound' = 'notFound';
  orders: any[] = [];
  orderedItems: { [key: string]: any[] } = {};
  expandedOrders: { [key: string]: boolean } = {};
  @Input() order: any;

  // TOast Properties
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  ngOnInit() {
    this.restaurantId = this.getRestaurantIdFromUrl()!;
    console.log('Restaurant ID:', this.restaurantId);

    this.orderService
      .getOrdersByRestaurantAPI(this.restaurantId)
      .subscribe((data) => {
        this.orders = data;
        console.log('Orders:', this.orders);
      });
  }

  showToastMessage(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ) {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  getRestaurantIdFromUrl(): string | null {
    const url = window.location.href;
    const idMatch = url.match(/\/admin\/dashboard\/(\d+)\/?/);
    if (idMatch && idMatch.length > 1) {
      return idMatch[1]; // Assuming the ID is captured in the first capture group
    } else {
      console.error('Restaurant ID not found in URL.');
      return null;
    }
  }

  toggleOrderDetails(orderId: string) {
    console.log(
      'Toggling order details for order:',
      orderId,
      'restaurant: ',
      this.restaurantId
    );

    if (this.expandedOrders[orderId]) {
      delete this.expandedOrders[orderId];
    } else {
      this.expandedOrders[orderId] = true;

      this.orderService
        .getOrderedItemsAPI(this.restaurantId, orderId)
        .subscribe((items) => {
          this.orderedItems[orderId] = items;
          console.log(`Ordered items for order ${orderId}`, items);
        });
    }
  }

  saveOrder(order: any) {
    console.log('Saving order:', order);

    const { id: orderId } = order;

    const updateData = {
      status: order.status,
      order_type: order.order_type,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
    };

    this.orderService
      .updateOrder(this.restaurantId, orderId, updateData)
      .subscribe((response) => {
        console.log('Order updated successfully');
      });

    // Show toast message
    this.showToastMessage('success', 'Order updated successfully');
  }

  saveOrderedItem(item: any) {
    console.log('Saving ordered item:', item);

    const { order_id: orderId, id: orderedItemId, status } = item;

    console.log('Order ID:', orderId);

    this.orderedItemsService
      .updateOrderedItem(this.restaurantId, orderId, orderedItemId, { status })
      .subscribe(() => {
        console.log('Ordered item updated successfully');
      });

    // Show toast message
    this.showToastMessage('success', 'Ordered item updated successfully');
  }
}
