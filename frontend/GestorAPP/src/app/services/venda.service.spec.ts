import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { VendaService } from './venda.service';

describe('VendaService', () => {
  let service: VendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(VendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
