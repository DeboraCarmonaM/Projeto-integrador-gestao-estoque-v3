import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {
  produto: Produto = new Produto('', 0, 0, ''); // categoria vazia no início

  categorias = ['Frutas', 'Verduras', 'Legumes', 'Bebidas', 'Biscoitos', 'Laticínios', 'Grãos', 'Padaria', 'Frios', 
    'Congelados', 'Limpeza', 'Higiene', 'Outros'];

  constructor(private apiService: ApiService) {}

  cadastrarProduto(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.produto.nome || this.produto.preco < 0 || this.produto.quantidade < 0 || !this.produto.categoria) {
      alert('Preencha os dados corretamente, incluindo a categoria!');
      return;
    }

    this.apiService.addProduto(this.produto).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.produto = new Produto('', 0, 0, ''); // resetando também a categoria
      },
      error: () => {
        alert('Erro ao cadastrar produto.');
      }
    });
  }
}

