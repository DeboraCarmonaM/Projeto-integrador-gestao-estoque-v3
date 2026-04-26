export type TipoLancamento = 'RECEITA' | 'DESPESA';
export type OrigemLancamento = 'VENDA' | 'COMPRA_ESTOQUE' | 'DESPESA_OPERACIONAL';

export interface Lancamento {
  id: number;
  data: string; // Formato 'YYYY-MM-DD'
  descricao: string;
  valor: number; // Positivo para RECEITA, Negativo para DESPESA
  tipo: TipoLancamento;
  categoriaId: number;
  referenciaVendaId?: string;
}

export interface CategoriaFinanceira {
  id: number;
  nome: string;
}