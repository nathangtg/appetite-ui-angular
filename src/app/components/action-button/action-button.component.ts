import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() buttonColor: string = 'blue-500';
  @Input() buttonHoverColor: string = 'blue-700';

  buttonClass: string = '';

  ngOnInit() {
    this.buttonClass = `bg-${this.buttonColor} hover:bg-${this.buttonHoverColor} text-white font-bold py-2 px-4 rounded`;
  }

  onClick() {
    this.buttonClick.emit();
  }
}
