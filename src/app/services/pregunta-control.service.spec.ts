import { TestBed } from '@angular/core/testing';

import { PreguntaControlService } from './pregunta-control.service';

describe('PreguntaControlService', () => {
  let service: PreguntaControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
