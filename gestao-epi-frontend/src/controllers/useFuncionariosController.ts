import { useEffect, useMemo, useState } from "react";
import { getSnapshot } from "../services/snapshot";
import { applyLocal, uuid } from "../services/queue";
import type { Funcionario, Snapshot } from "../models/domain";

export function useFuncionariosController() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try { const s = await getSnapshot(); if (alive) setSnap(s); }
      catch (e) { if (alive) setErr(String(e)); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const funcionarios = useMemo(() => snap?.funcionarios ?? [], [snap]);
  const total = funcionarios.length;

  function createFuncionario(input: Omit<Funcionario, "id">) {
    const item: Funcionario = { id: Date.now(), ...input };
    applyLocal({ id: uuid(), kind: "FUNC_CREATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, funcionarios: [...prev.funcionarios, item] }) : prev);
  }

  function updateFuncionario(item: Funcionario) {
    applyLocal({ id: uuid(), kind: "FUNC_UPDATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, funcionarios: prev.funcionarios.map(x => x.id === item.id ? item : x) }) : prev);
  }

  function deleteFuncionario(id: number) {
    applyLocal({ id: uuid(), kind: "FUNC_DELETE", payload: { id }, ts: Date.now() });
    setSnap(prev => prev ? ({
      ...prev,
      funcionarios: prev.funcionarios.filter(x => x.id !== id),
      movimentacoes: prev.movimentacoes.filter(m => m.funcionario !== id)
    }) : prev);
  }

  return { funcionarios, total, loading, err, createFuncionario, updateFuncionario, deleteFuncionario };
}
