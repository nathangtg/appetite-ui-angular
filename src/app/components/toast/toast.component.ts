import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() show: boolean = false;

  hide(): void {
    this.show = false;
  }
}
