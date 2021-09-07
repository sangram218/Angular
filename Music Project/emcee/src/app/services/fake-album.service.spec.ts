import { TestBed } from '@angular/core/testing';

import { FakeAlbumService } from './fake-album.service';

describe('FakeAlbumService', () => {
  let service: FakeAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
