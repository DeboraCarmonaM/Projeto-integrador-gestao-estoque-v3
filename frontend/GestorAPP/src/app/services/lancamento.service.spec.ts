import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { LancamentoService } from './lancamento.service';

describe('LancamentoService', () => {
  let service: LancamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(LancamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
