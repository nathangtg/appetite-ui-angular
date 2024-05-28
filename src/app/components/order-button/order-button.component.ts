import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-button',
  standalone: true,
  imports: [],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.css',
})
export class OrderButtonComponent {
  @Output() order = new EventEmitter<void>();

  handleClick() {
    this.order.emit();
  }
}
