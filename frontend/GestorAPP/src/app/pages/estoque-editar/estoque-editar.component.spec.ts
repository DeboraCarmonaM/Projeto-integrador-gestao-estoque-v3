import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { EstoqueEditarComponent } from './estoque-editar.component';

describe('EstoqueEditarComponent', () => {
  let component: EstoqueEditarComponent;
  let fixture: ComponentFixture<EstoqueEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueEditarComponent],
      providers: [provideHttpClient(), provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstoqueEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
