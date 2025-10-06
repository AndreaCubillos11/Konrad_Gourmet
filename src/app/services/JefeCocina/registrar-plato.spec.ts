import { TestBed } from '@angular/core/testing';

import { RegistrarPlatoService } from '../JefeCocina/registrar-plato';

describe('RegistrarPlato', () => {
  let service: RegistrarPlatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarPlatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
