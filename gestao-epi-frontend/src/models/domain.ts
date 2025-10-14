export interface Epi {
  id: number;
  nome: string;
  ca: string;
  fabricante?: string | null;
  validadeCA: string;
  tempoUsoDias: number;
  estoqueMinimo: number;
  estoqueAtual: number;
  dataCadastro: string;
}

export interface Funcionario {
  id: number;
  matricula: string;
  nomeCompleto: string;
  funcao?: string | null;
  setor?: string | null;
  ativo: boolean;
  dataCadastro: string;
}

export interface Movimentacao {
  id: number;
  funcionario: number; // id
  epi: number;         // id
  dataEntrega: string;
  dataDevolucao?: string | null;
  motivoTroca?: string | null;
  dataVencimentoUso: string;
  observacoes?: string | null;
}

export interface Snapshot {
  version: number;
  generatedAt: string;
  epis: Epi[];
  funcionarios: Funcionario[];
  movimentacoes: Movimentacao[];
}
