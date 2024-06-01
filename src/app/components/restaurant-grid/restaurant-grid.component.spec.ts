import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantGridComponent } from './restaurant-grid.component';

describe('RestaurantGridComponent', () => {
  let component: RestaurantGridComponent;
  let fixture: ComponentFixture<RestaurantGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
