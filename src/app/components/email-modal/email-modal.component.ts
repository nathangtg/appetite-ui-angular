import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.css',
})
export class EmailModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitEmail = new EventEmitter<string>();
  email: string = '';

  handleSubmit() {
    this.submitEmail.emit(this.email);
    this.close.emit();
  }
}
