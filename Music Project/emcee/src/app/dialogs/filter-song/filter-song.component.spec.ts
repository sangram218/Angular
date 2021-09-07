import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSongComponent } from './filter-song.component';

describe('FilterSongComponent', () => {
  let component: FilterSongComponent;
  let fixture: ComponentFixture<FilterSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
