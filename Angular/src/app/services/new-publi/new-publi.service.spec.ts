import { TestBed } from '@angular/core/testing';

import { NewPubliService } from './new-publi.service';

describe('NewPubliService', () => {
  let service: NewPubliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPubliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
