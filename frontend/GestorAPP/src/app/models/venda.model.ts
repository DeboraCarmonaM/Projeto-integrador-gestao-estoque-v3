export interface ItemVenda {
    produtoId: string;
    quantidade: number;
    precoVenda: number;
}

export interface Venda {
    id: string; // ID da transação
    data: string; // Data da venda (YYYY-MM-DD)
    totalVenda: number; // Receita (Soma de todos os itens * precoVenda)
    totalCusto: number; // CMV (Soma de todos os itens * precoCusto)
    itens: ItemVenda[];
}