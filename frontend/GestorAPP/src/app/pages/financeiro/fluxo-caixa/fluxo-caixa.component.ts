import { Component, OnInit } from '@angular/core';
import { Lancamento, TipoLancamento, CategoriaFinanceira } from '../../../models/lancamento.model';
import { LancamentoService } from '../../../services/lancamento.service';
import { CommonModule, DatePipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fluxo-caixa',
  templateUrl: './fluxo-caixa.component.html',
  styleUrls: ['./fluxo-caixa.component.scss'],
  standalone: true,
  imports: [FormsModule,
    CommonModule
  ],
  providers: [DatePipe]
})
export class FluxoCaixaComponent implements OnInit {
  
  // -----------------------------------------------------
  // DECLARAÇÕES ESTÁTICAS PARA TESTE (POPULAÇÃO FIXA)
  // -----------------------------------------------------

  // Dados estáticos de categorias para simular a função getNomeCategoria
  categorias: CategoriaFinanceira[] = [
    { id: 1, nome: 'Aluguel/Imóveis' } as CategoriaFinanceira,
    { id: 2, nome: 'Estoque/Compras' } as CategoriaFinanceira,
    { id: 3, nome: 'Manutenção/Serviços' } as CategoriaFinanceira,
    { id: 4, nome: 'Vendas - Cartão' } as CategoriaFinanceira,
    { id: 5, nome: 'Vendas - Dinheiro/Pix' } as CategoriaFinanceira,
  ];

  // Dados estáticos de DESPESAS e RECEITAS para o *ngFor na tabela
  // Total Despesas: 7895.00 | Total Receitas: 15000.00
  lancamentosParaTabela: Lancamento[] = [
    {
      id: 6,
      data: new Date(2025, 9, 1).toISOString().split('T')[0], // Dia 1
      descricao: 'Vendas diárias (Dinheiro/Pix)',
      categoriaId: 5,
      tipo: 'RECEITA',
      valor: 5000.00
    },
    {
      id: 7,
      data: new Date(2025, 9, 3).toISOString().split('T')[0], // Dia 3
      descricao: 'Recebimento Vendas Cartão (D+2)',
      categoriaId: 4,
      tipo: 'RECEITA',
      valor: 7500.00
    },
    {
      id: 8,
      data: new Date(2025, 9, 9).toISOString().split('T')[0], // Dia 9
      descricao: 'Vendas diárias complementares',
      categoriaId: 5,
      tipo: 'RECEITA',
      valor: 2500.00
    },
    
    {
      id: 1,
      data: new Date(2025, 9, 1).toISOString().split('T')[0], 
      descricao: 'Aluguel do Escritório',
      categoriaId: 1,
      tipo: 'DESPESA',
      valor: 3500.00
    },
    {
      id: 2,
      data: new Date(2025, 9, 3).toISOString().split('T')[0], 
      descricao: 'Compra de Mercadoria - Lote A',
      categoriaId: 2,
      tipo: 'DESPESA',
      valor: 2150.00
    },
    {
      id: 3,
      data: new Date(2025, 9, 2).toISOString().split('T')[0], 
      descricao: 'Manutenção de Equipamentos',
      categoriaId: 3,
      tipo: 'DESPESA',
      valor: 750.00
    },
    {
      id: 4,
      data: new Date(2025, 9, 7).toISOString().split('T')[0], 
      descricao: 'Compra de Mercadoria - Lote B',
      categoriaId: 2,
      tipo: 'DESPESA',
      valor: 1000.00
    },
    {
      id: 5,
      data: new Date(2025, 9, 4).toISOString().split('T')[0], 
      descricao: 'Serviços de Limpeza e Manutenção',
      categoriaId: 3,
      tipo: 'DESPESA',
      valor: 495.00
    }
  ] as Lancamento[];
  
  // --- Dados Principais e Filtros (MANTIDOS) ---
  // Apenas garantimos que o array principal 'lancamentos' é inicializado com a tabela fixa.
  lancamentos: Lancamento[] = this.lancamentosParaTabela; 
  
  // Variáveis de Filtro
  dataInicial: string; 
  dataFinal: string;
  filtroTipo: 'TODOS' | TipoLancamento = 'TODOS'; // Agora o filtro é 'TODOS' para mostrar tudo por padrão
  
  // Resultados Calculados
  totalReceitas: number = 15000.00; // Total Receitas Fixo
  totalDespesas: number = 7895.00; // Total Despesas Fixo
  saldoAtual: number = 15000.00 - 7895.00; // 7105.00

  // Para novo lançamento manual (Despesa Operacional)
  novoLancamento: Partial<Omit<Lancamento, 'id'>> = {};

  constructor(
    private lancamentoService: LancamentoService,
    private datePipe: DatePipe // Injetar DatePipe
  ) {
    // Inicializa as datas com o dia de hoje no formato YYYY-MM-DD
    const today = new Date();
    this.dataInicial = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
    this.dataFinal = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
  }

  ngOnInit(): void {
    // CORREÇÃO: Removido o call a this.carregarCategorias() que estava comentado (Erro TS2339)
    // Se você quiser que o ngOnInit mostre os dados estáticos:
    this.calcularTotais();
    // this.carregarLancamentos(); // Deixe esta linha comentada se quiser usar apenas os dados estáticos
    this.inicializarNovoLancamento();
  }

  // --- Funções de Inicialização e Carregamento ---

  inicializarNovoLancamento(): void {
      this.novoLancamento = {
        data: this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '',
        tipo: 'DESPESA',
        valor: 0,
        descricao: '',
        categoriaId: undefined
      };
  }

  // Função que o HTML usa para buscar o nome da categoria (Versão Estática)
  getNomeCategoria(id: number | undefined): string {
    if (!id) return 'Não Classificado';
    return this.categorias.find(c => c.id === id)?.nome || 'Categoria Desconhecida';
  }

  // A função carregarLancamentos original (que busca dados) pode ser mantida, mas não
  // deve ser chamada se você quer usar a lista fixa 'lancamentosParaTabela'.
  carregarLancamentos(): void {
    if (!this.dataInicial || !this.dataFinal) {
      alert('Selecione um período válido.');
      return;
    }
    
    // Comentando a lógica de serviço para evitar erro de servidor JSON no ambiente de teste:
    // this.lancamentoService.getLancamentos(this.dataInicial, this.dataFinal)
    //   .subscribe(data => {
    //     this.lancamentos = data;
    //     this.calcularTotais(); 
    //   }, error => {
    //       console.error("Erro ao carregar lançamentos:", error);
    //       alert('Erro ao carregar lançamentos. Verifique o servidor JSON (Porta 3000).');
    //   });
    
    // Para manter a funcionalidade de resumo (calcularTotais) quando o botão de filtro é pressionado,
    // garantimos que o array principal 'lancamentos' é atualizado (opcionalmente)
    this.lancamentos = this.lancamentosParaTabela;
    this.calcularTotais();
  }

  // --- Funções de Lógica e Cálculo (CRUCIAL PARA O RESUMO) ---

  calcularTotais(): void {
    this.totalReceitas = 0;
    this.totalDespesas = 0;

    const lancamentosParaResumo = this.lancamentosParaTabela.filter(lanc => { // Usando o array estático
        if (this.filtroTipo === 'TODOS') return true;
        return lanc.tipo === this.filtroTipo;
    });

    lancamentosParaResumo.forEach(lanc => {
        if (lanc.tipo === 'RECEITA') {
            this.totalReceitas += lanc.valor; 
        } else if (lanc.tipo === 'DESPESA') {
            this.totalDespesas += Math.abs(lanc.valor); 
        }
    });

    this.saldoAtual = this.totalReceitas - this.totalDespesas;
  }
  
  // --- Funções de Ação e UI ---

  aplicarFiltros(): void {
    // Usando dados estáticos: Apenas recalcula os totais com base no filtroTipo
    this.calcularTotais();
  }

  // Chamado quando o tipo do filtro muda
  mudarFiltroTipo(): void {
    this.calcularTotais();
  }

  salvarLancamentoManual(): void {
    // Lógica do serviço comentada
    alert('Função de salvar desativada no modo de dados estáticos.');
  }
}