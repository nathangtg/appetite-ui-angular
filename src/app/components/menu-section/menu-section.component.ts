import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCardComponent } from '../menu-card/menu-card.component';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [NgIf, NgFor, MenuCardComponent],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.css',
})
export class MenuSectionComponent {
  @Input() menuItems: any[] = [];
  @Output() quantityChange = new EventEmitter<any>();

  handleQuantityChange(event: any) {
    this.quantityChange.emit(event);
  }
}
