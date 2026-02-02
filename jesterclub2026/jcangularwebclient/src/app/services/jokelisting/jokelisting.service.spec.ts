import { TestBed } from '@angular/core/testing';

import { JokeListingService } from './jokelisting.service'

describe('JokeListingService', () => {
  let service: JokeListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
