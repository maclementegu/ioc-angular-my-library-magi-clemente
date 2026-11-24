import { TestBed } from '@angular/core/testing';
import { Llibre } from './llibre.service';

describe('Llibre', () => {
  let service: Llibre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Llibre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
