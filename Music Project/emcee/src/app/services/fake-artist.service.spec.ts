import { TestBed } from '@angular/core/testing';

import { FakeArtistService } from './fake-artist.service';

describe('FakeArtistService', () => {
  let service: FakeArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
