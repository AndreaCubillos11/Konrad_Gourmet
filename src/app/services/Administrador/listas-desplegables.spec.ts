import { TestBed } from '@angular/core/testing';

import { ListasDesplegables } from './listas-desplegables';

describe('ListasDesplegables', () => {
  let service: ListasDesplegables;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListasDesplegables);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
