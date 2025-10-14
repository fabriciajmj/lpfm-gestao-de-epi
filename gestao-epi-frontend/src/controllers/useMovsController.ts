import { useEffect, useMemo, useState } from "react";
import { getSnapshot } from "../services/snapshot";
import { applyLocal, uuid } from "../services/queue";
import type { Movimentacao, Snapshot } from "../models/domain";

export function useMovsController() {
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

  const movs = useMemo(() => snap?.movimentacoes ?? [], [snap]);

  function createMov(input: Omit<Movimentacao, "id">) {
    const item: Movimentacao = { id: Date.now(), ...input };
    applyLocal({ id: uuid(), kind: "MOV_CREATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, movimentacoes: [...prev.movimentacoes, item] }) : prev);
  }

  function updateMov(item: Movimentacao) {
    applyLocal({ id: uuid(), kind: "MOV_UPDATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, movimentacoes: prev.movimentacoes.map(x => x.id === item.id ? item : x) }) : prev);
  }

  function deleteMov(id: number) {
    applyLocal({ id: uuid(), kind: "MOV_DELETE", payload: { id }, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, movimentacoes: prev.movimentacoes.filter(x => x.id !== id) }) : prev);
  }

  return { movs, loading, err, createMov, updateMov, deleteMov };
}
