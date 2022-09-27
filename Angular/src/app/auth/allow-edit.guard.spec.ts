import { TestBed } from '@angular/core/testing';

import { AllowEditGuard } from './allow-edit.guard';

describe('AllowEditGuard', () => {
  let guard: AllowEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllowEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
