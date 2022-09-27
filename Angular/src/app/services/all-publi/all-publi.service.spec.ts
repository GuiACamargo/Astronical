import { TestBed } from '@angular/core/testing';

import { AllPubliService } from './all-publi.service';

describe('AllPubliService', () => {
  let service: AllPubliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllPubliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
