import { TestBed, inject } from '@angular/core/testing';

import { CreatePageService } from './create-page.service';

describe('CreatePageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePageService]
    });
  });

  it('should be created', inject([CreatePageService], (service: CreatePageService) => {
    expect(service).toBeTruthy();
  }));
});
