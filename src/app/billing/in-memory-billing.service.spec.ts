import { TestBed, inject } from '@angular/core/testing';

import { InMemoryBillingService } from './in-memory-billing.service';

describe('InMemoryBillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryBillingService]
    });
  });

  it('should be created', inject([InMemoryBillingService], (service: InMemoryBillingService) => {
    expect(service).toBeTruthy();
  }));
});
