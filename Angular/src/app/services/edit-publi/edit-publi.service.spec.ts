import { TestBed } from '@angular/core/testing';

import { EditPubliService } from './edit-publi.service';

describe('EditPubliService', () => {
  let service: EditPubliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPubliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
