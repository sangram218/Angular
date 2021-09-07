import { TestBed } from '@angular/core/testing';

import { FakeSongService } from './fake-song.service';

describe('FakeSongService', () => {
  let service: FakeSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
