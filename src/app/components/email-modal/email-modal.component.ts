import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, NgFor, NgForOf],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.css',
})
export class EmailModalComponent {
  @Input() show: boolean = false;
  @Input() tableNumbers: number[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() submitOrderDetails = new EventEmitter<any>();

  email: string = '';
  orderType: 'dine-in' | 'takeaway' = 'takeaway';
  paymentMethod: 'cash' | 'card' = 'cash';

  // Fetch the table number from the restaurant
  tableNumber: number = this.tableNumbers[0];

  handleSubmit() {
    this.submitOrderDetails.emit({
      email: this.email,
      orderType: this.orderType,
      paymentMethod: this.paymentMethod,
      tableNumber: this.orderType === 'dine-in' ? this.tableNumber : null,
    });
    this.close.emit();
  }
}
