import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { FormsModule } from '@angular/forms';
import { OrderedItemsService } from '../../services/ordered-items/ordered-items.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ToastComponent, LoadingComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private orderedItemsService: OrderedItemsService
  ) {}

  restaurantId: string | 'notFound' = 'notFound';
  orders: any[] = [];
  filteredOrders: any[] = [];
  orderedItems: { [key: string]: any[] } = {};
  expandedOrders: { [key: string]: boolean } = {};
  @Input() order: any;

  // Toast Properties
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  // Filter properties
  filterStatus: string = '';
  filterOrderType: string = '';
  filterPaymentMethod: string = '';
  filterPaymentStatus: string = '';
  searchQuery: string = '';

  loadingOrder: boolean = false;

  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  orderTypeOptions = [
    { label: 'All', value: '' },
    { label: 'Dine-in', value: 'dine-in' },
    { label: 'Takeaway', value: 'takeaway' },
  ];

  paymentMethodOptions = [
    { label: 'All', value: '' },
    { label: 'Cash', value: 'cash' },
    { label: 'Card', value: 'card' },
  ];

  paymentStatusOptions = [
    { label: 'All', value: '' },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
  ];

  ngOnInit() {
    this.restaurantId = this.getRestaurantIdFromUrl()!;
    console.log('Restaurant ID:', this.restaurantId);

    this.loadingOrder = true;

    this.orderService
      .getOrdersByRestaurantAPI(this.restaurantId)
      .subscribe((data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.loadingOrder = false;
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

  filterOrders(): void {
    this.filteredOrders = this.orders.filter((order) => {
      return (
        (this.filterStatus === '' || order.status === this.filterStatus) &&
        (this.filterOrderType === '' ||
          order.order_type === this.filterOrderType) &&
        (this.filterPaymentMethod === '' ||
          order.payment_method === this.filterPaymentMethod) &&
        (this.filterPaymentStatus === '' ||
          order.payment_status === this.filterPaymentStatus) &&
        (this.searchQuery === '' ||
          order.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    });
  }
}
