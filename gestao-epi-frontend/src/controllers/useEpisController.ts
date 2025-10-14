import { useEffect, useMemo, useState } from "react";
import { getSnapshot } from "../services/snapshot";
import { applyLocal, uuid } from "../services/queue";
import type { Epi, Snapshot } from "../models/domain";

export function useEpisController() {
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

  const epis = useMemo(() => snap?.epis ?? [], [snap]);
  const total = epis.length;

  function createEpi(input: Omit<Epi, "id">) {
    const item: Epi = { id: Date.now(), ...input };
    applyLocal({ id: uuid(), kind: "EPI_CREATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, epis: [...prev.epis, item] }) : prev);
  }

  function updateEpi(item: Epi) {
    applyLocal({ id: uuid(), kind: "EPI_UPDATE", payload: item, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, epis: prev.epis.map(x => x.id === item.id ? item : x) }) : prev);
  }

  function deleteEpi(id: number) {
    applyLocal({ id: uuid(), kind: "EPI_DELETE", payload: { id }, ts: Date.now() });
    setSnap(prev => prev ? ({ ...prev, epis: prev.epis.filter(x => x.id !== id),
      movimentacoes: prev.movimentacoes.filter(m => m.epi !== id) }) : prev);
  }

  return { epis, total, loading, err, createEpi, updateEpi, deleteEpi };
}
