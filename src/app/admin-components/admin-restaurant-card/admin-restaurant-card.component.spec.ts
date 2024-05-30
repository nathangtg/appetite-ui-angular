import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantCardComponent } from './admin-restaurant-card.component';

describe('AdminRestaurantCardComponent', () => {
  let component: AdminRestaurantCardComponent;
  let fixture: ComponentFixture<AdminRestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
