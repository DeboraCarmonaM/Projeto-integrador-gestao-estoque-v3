import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model'; 

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:3000/vendas';

  constructor(private http: HttpClient) { }

  /**
   * Busca as vendas do JSON Server em um período específico.
   * O JSON Server usará o campo 'data' da venda para o filtro.
   */
  getVendas(dataInicial: string, dataFinal: string): Observable<Venda[]> {
    let params = new HttpParams()
      .set('data_gte', dataInicial)
      .set('data_lte', dataFinal);
      
    // Exemplo: GET /vendas?data_gte=2024-10-01&data_lte=2024-10-31
    return this.http.get<Venda[]>(this.apiUrl, { params });
  }

  // Método para adicionar uma nova venda (se precisar na V1)
  adicionarVenda(venda: Omit<Venda, 'id'>): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }
}