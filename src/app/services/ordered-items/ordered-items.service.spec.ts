import { TestBed } from '@angular/core/testing';

import { OrderedItemsService } from './ordered-items.service';

describe('OrderedItemsService', () => {
  let service: OrderedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
