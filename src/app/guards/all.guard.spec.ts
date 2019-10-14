import { TestBed, async, inject } from '@angular/core/testing';

import { AllGuard } from './all.guard';

describe('AllGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllGuard]
    });
  });

  it('should ...', inject([AllGuard], (guard: AllGuard) => {
    expect(guard).toBeTruthy();
  }));
});
