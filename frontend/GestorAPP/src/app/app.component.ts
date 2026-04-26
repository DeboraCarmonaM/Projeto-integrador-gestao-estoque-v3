import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importando o RouterModule
import { CommonModule } from '@angular/common';
import { EstoqueComponent } from './pages/estoque/estoque.component'; // Se já não tiver importado
import { CadastroComponent } from './pages/cadastro/cadastro.component'; // Se já não tiver importado


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, EstoqueComponent, CadastroComponent],
  template: `
    <header class="header-principal">
  <h1>Gestão de Estoque</h1>
  <nav aria-label="Navegação principal">
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Estoque</a>
    <a routerLink="/cadastro" routerLinkActive="active">Cadastro</a>
    <a routerLink="/financeiro/fluxo-caixa" routerLinkActive="active">Fluxo de Caixa</a>
    <a routerLink="/financeiro/relatorios" routerLinkActive="active">Relatórios</a>
  </nav>
</header>
<router-outlet></router-outlet>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestorAPP';
}
