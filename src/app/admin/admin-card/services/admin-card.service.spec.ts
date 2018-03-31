import { TestBed, inject } from '@angular/core/testing';

import { AdminCardService } from './admin-card.service';

describe('AdminCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCardService]
    });
  });

  it('should be created', inject([AdminCardService], (service: AdminCardService) => {
    expect(service).toBeTruthy();
  }));
});
