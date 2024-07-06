import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rating-modal.component.html',
  styleUrl: './rating-modal.component.css',
})
export class RatingModalComponent {
  @Output() ratingSubmitted = new EventEmitter<{
    orderId: string;
    restaurantId: string;
    rating: number;
    comment: string;
  }>();

  @Output() modalClosed = new EventEmitter<void>(); // Define modalClosed as an EventEmitter

  orderId: string = ''; // This should be bound to an input in your modal component
  restaurantId: string = ''; // This should be bound to an input in your modal component
  rating: number = 0;
  comment: string = '';
  showRatingModal = true;

  // Method to submit the rating
  submitRating() {
    this.ratingSubmitted.emit({
      orderId: this.orderId,
      restaurantId: this.restaurantId,
      rating: this.rating,
      comment: this.comment,
    });
    // Optionally, reset form or close modal
    this.rating = 0;
    this.comment = '';
  }

  closeModal() {
    this.modalClosed.emit(); // Emitting the modalClosed event

    // Optionally, reset form or close modal
    this.rating = 0;
    this.comment = '';

    // Hide modal
    this.showRatingModal = false;
  }
}
