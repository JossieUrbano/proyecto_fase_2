import { TestBed } from '@angular/core/testing';

import { CitasService } from './cit.service';

describe('CitasService', () => {
  let service: CitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
