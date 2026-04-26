// src/app/services/lancamento.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento, CategoriaFinanceira } from '../models/lancamento.model'; // Ajustar o caminho

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private apiUrl = 'http://localhost:3000/lancamentos';
  private apiCategoriasUrl = 'http://localhost:3000/categoriasFinanceiras';

  constructor(private http: HttpClient) { }

  // 1. OBTÉM CATEGORIAS
  getCategorias(): Observable<CategoriaFinanceira[]> {
    return this.http.get<CategoriaFinanceira[]>(this.apiCategoriasUrl);
  }

  // 2. OBTÉM LANÇAMENTOS COM FILTRO
  getLancamentos(dataInicial: string, dataFinal: string): Observable<Lancamento[]> {
    let params = new HttpParams()
      .set('data_gte', dataInicial)
      .set('data_lte', dataFinal);
      
    return this.http.get<Lancamento[]>(this.apiUrl, { params });
  }

  // 3. REGISTRA NOVO LANÇAMENTO
  adicionarLancamento(lancamento: Omit<Lancamento, 'id'>): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl, lancamento);
  }
}