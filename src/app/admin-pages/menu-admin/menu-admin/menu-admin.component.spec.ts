import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminComponent } from './menu-admin.component';

describe('MenuAdminComponent', () => {
  let component: MenuAdminComponent;
  let fixture: ComponentFixture<MenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
