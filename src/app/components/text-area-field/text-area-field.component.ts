import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.css',
})
export class TextAreaFieldComponent {
  @Input() label: string = 'Label not declared';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
