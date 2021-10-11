import { TestBed } from '@angular/core/testing';

import { BooklistGuard } from './booklist.guard';

describe('BooklistGuard', () => {
  let guard: BooklistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BooklistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
