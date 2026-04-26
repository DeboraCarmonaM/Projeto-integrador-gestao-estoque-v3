import { Routes } from '@angular/router';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EstoqueEditarComponent } from './pages/estoque-editar/estoque-editar.component';

// --- NOVAS IMPORTAÇÕES V2 ---
import { FluxoCaixaComponent } from './pages/financeiro/fluxo-caixa/fluxo-caixa.component'; 
import { RelatoriosComponent } from './pages/financeiro/relatorios/relatorios.component'; 
// -----------------------------

export const routes: Routes = [
    // Rotas V1 existentes
    {path: 'estoque', component: EstoqueComponent},
    { path: 'cadastro', component: CadastroComponent },
    { path: 'estoque/editar/:id', component: EstoqueEditarComponent },

    // --- NOVAS ROTAS V2 (FINANCEIRO) ---
    { path: 'financeiro/fluxo-caixa', component: FluxoCaixaComponent },
    { path: 'financeiro/relatorios', component: RelatoriosComponent },
    // ------------------------------------
    
    // Rota padrão (redireciona para o estoque)
    { path: '', redirectTo: 'estoque', pathMatch: 'full' }
];