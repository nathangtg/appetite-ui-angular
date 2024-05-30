import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIdComponent } from './dashboard-id.component';

describe('DashboardIdComponent', () => {
  let component: DashboardIdComponent;
  let fixture: ComponentFixture<DashboardIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
