import { TestBed } from '@angular/core/testing';

import { AllowProfileGuard } from './allow-profile.guard';

describe('AllowProfileGuard', () => {
  let guard: AllowProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllowProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
