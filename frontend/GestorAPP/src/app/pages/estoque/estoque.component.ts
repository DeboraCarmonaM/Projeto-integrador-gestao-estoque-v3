import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';  
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';


@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent {
  subscription!: Subscription;
  produtos: any[] = [];
  filtroNome: string = '';
  filtroCategoria: string = '';
  Object = Object;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.carregarProdutos();
    this.subscription = this.apiService.produtosAtualizados$.subscribe(() => {
      this.carregarProdutos();
    });
    this.apiService.produtosAtualizados$.subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  carregarProdutos() {
    this.apiService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  loadProdutos() {
    this.apiService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  editarProduto(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/estoque/editar', id]);
  }

  excluirProduto(id: string | undefined) {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.apiService.deleteProduto(id).subscribe(() => {
        alert('Produto excluído com sucesso!');
        this.loadProdutos();
      }, () => {
        alert('Erro ao excluir produto.');
      });
    }
  }

  get produtosFiltrados() {
    return this.produtos.filter(p =>
      (p.nome ?? '').toLowerCase().includes((this.filtroNome ?? '').toLowerCase()) &&
      (p.categoria ?? '').toLowerCase().includes((this.filtroCategoria ?? '').toLowerCase())
    );
  }
  

  get produtosPorCategoria() {
    const grupos: { [categoria: string]: Produto[] } = {};
    for (const p of this.produtosFiltrados) {
      const categoria = (p.categoria ?? '').toUpperCase();
      if (!grupos[categoria]) grupos[categoria] = [];
      grupos[categoria].push(p);
    }
    return grupos;
  }
  
  
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
