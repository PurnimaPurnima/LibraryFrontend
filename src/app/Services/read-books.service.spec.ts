import { TestBed } from '@angular/core/testing';

import { ReadBooksService } from './read-books.service';

describe('ReadBooksService', () => {
  let service: ReadBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
