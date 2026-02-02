import { TestBed } from '@angular/core/testing';

import { FakeUserAuthService } from './fakeuserauth.service';

describe('FakeUserAuthService', () => {
  let service: FakeUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
