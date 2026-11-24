import { TestBed } from '@angular/core/testing';
import { LlibreService } from './llibre.service';

describe('LlibreService', () => {
  let service: LlibreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlibreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});