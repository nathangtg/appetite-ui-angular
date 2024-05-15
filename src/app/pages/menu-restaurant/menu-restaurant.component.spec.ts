import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestaurantComponent } from './menu-restaurant.component';

describe('MenuRestaurantComponent', () => {
  let component: MenuRestaurantComponent;
  let fixture: ComponentFixture<MenuRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
