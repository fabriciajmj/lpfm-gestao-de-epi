import { loadSnapshot, saveSnapshot, loadQueue, setQueue, pushQueue } from "./storage";
import type { Snapshot, Epi, Funcionario, Movimentacao } from "../models/domain";

// Tipos de operação
type OpKind = "EPI_CREATE"|"EPI_UPDATE"|"EPI_DELETE"|
              "FUNC_CREATE"|"FUNC_UPDATE"|"FUNC_DELETE"|
              "MOV_CREATE"|"MOV_UPDATE"|"MOV_DELETE";

export interface Op {
  id: string;        // uuid
  kind: OpKind;
  payload: any;
  ts: number;
}

/** Aplica mutação local no snapshot e registra na fila */
export function applyLocal(op: Op) {
  const snap = loadSnapshot<Snapshot>().data;
  if (!snap) throw new Error("Snapshot não carregado");

  switch (op.kind) {
    case "EPI_CREATE": {
      const item: Epi = op.payload;
      snap.epis.push(item);
      break;
    }
    case "EPI_UPDATE": {
      const item: Epi = op.payload;
      const i = snap.epis.findIndex(x => x.id === item.id);
      if (i >= 0) snap.epis[i] = item;
      break;
    }
    case "EPI_DELETE": {
      const id: number = op.payload.id;
      snap.epis = snap.epis.filter(x => x.id !== id);
      // Opcional: também remova movimentações vinculadas
      snap.movimentacoes = snap.movimentacoes.filter(m => m.epi !== id);
      break;
    }

    case "FUNC_CREATE": {
      snap.funcionarios.push(op.payload as Funcionario);
      break;
    }
    case "FUNC_UPDATE": {
      const item: Funcionario = op.payload;
      const i = snap.funcionarios.findIndex(x => x.id === item.id);
      if (i >= 0) snap.funcionarios[i] = item;
      break;
    }
    case "FUNC_DELETE": {
      const id: number = op.payload.id;
      snap.funcionarios = snap.funcionarios.filter(x => x.id !== id);
      snap.movimentacoes = snap.movimentacoes.filter(m => m.funcionario !== id);
      break;
    }

    case "MOV_CREATE": {
      snap.movimentacoes.push(op.payload as Movimentacao);
      break;
    }
    case "MOV_UPDATE": {
      const item: Movimentacao = op.payload;
      const i = snap.movimentacoes.findIndex(x => x.id === item.id);
      if (i >= 0) snap.movimentacoes[i] = item;
      break;
    }
    case "MOV_DELETE": {
      const id: number = op.payload.id;
      snap.movimentacoes = snap.movimentacoes.filter(x => x.id !== id);
      break;
    }
  }

  saveSnapshot(snap);
  pushQueue(op);
}

/** (Futuro) envia fila para a API e, se OK, limpa ou reconcilia */
export async function flushToApi(): Promise<void> {
  const queue = loadQueue<Op[]>();
  // TODO: implementar chamadas REST reais, transacionar e limpar a fila item a item
  setQueue(queue); // por enquanto, no-op
}

/** utilitário */
export const uuid = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2);
