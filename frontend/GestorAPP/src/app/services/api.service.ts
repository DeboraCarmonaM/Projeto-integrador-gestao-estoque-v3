import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.model';
import { BehaviorSubject, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://backend-projeto-minha-quitandinha.onrender.com';

  private produtosAtualizadosSubject = new Subject<Produto[]>();
  
  produtosAtualizados$ = this.produtosAtualizadosSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProdutos() {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos`);
  }

  // addProduto(produto: Produto) {
  //   return this.http.post(`${this.apiUrl}/produtos`, produto);
  // }

  addProduto(produto: Produto) {
    return this.http.post(`${this.apiUrl}/produtos`, produto).pipe(
      tap(() => {
        this.getProdutos().subscribe(produtos => {
          this.produtosAtualizadosSubject.next(produtos);
        });
      })
    );
  }

  getProdutoById(id: string) {
    return this.http.get<Produto>(`${this.apiUrl}/produtos/${id}`);
  }
  
  updateProduto(id: string, produto: Produto) {
    return this.http.put(`${this.apiUrl}/produtos/${id}`, produto);
  }
  
  deleteProduto(id: string) {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }
  

  
  
}
