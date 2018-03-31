import { TestBed, inject } from '@angular/core/testing';

import { RenderPageService } from './render-pages-service.service';

describe('RenderPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderPageService]
    });
  });

  it('should be created', inject([RenderPageService], (service: RenderPageService) => {
    expect(service).toBeTruthy();
  }));
});
