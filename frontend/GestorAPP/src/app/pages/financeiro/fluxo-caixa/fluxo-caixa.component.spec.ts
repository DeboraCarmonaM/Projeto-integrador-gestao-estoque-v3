import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { FluxoCaixaComponent } from './fluxo-caixa.component';

describe('FluxoCaixaComponent', () => {
  let component: FluxoCaixaComponent;
  let fixture: ComponentFixture<FluxoCaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixaComponent],
      providers: [provideHttpClient(), provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FluxoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
