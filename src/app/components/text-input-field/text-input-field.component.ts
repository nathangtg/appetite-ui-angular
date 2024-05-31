import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-input-field.component.html',
  styleUrl: './text-input-field.component.css',
})
export class TextInputFieldComponent {
  @Input() name: string = 'name';
  @Input() label: string = 'Label not declared';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}
