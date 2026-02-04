import { TestBed } from '@angular/core/testing';

import { JokeeditorService } from './jokeeditor.service';

describe('JokeeditorService', () => {
  let service: JokeeditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeeditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
