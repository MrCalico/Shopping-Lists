import { TestBed, inject } from '@angular/core/testing';

import { StoreItemsService } from './store-items.service';

describe('StoreItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreItemsService]
    });
  });

  it('should be created', inject([StoreItemsService], (service: StoreItemsService) => {
    expect(service).toBeTruthy();
  }));
});
