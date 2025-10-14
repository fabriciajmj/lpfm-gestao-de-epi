import { useParams, Link, useNavigate } from "react-router-dom";
import { useEpisController } from "../../controllers/useEpisController";
import { useEffect, useState } from "react";
import type { Epi } from "../../models/domain";

export default function EpiDetailsView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { epis, updateEpi } = useEpisController();
  const [draft, setDraft] = useState<Epi | null>(null);

  useEffect(() => {
    const e = epis.find(x => String(x.id) === id);
    if (e) setDraft(e);
  }, [epis, id]);

  if (!draft) return (
    <section>
      <p>EPI não encontrado.</p>
      <Link className="underline" to="/epis">← Voltar</Link>
    </section>
  );

  function save() { updateEpi(draft); nav("/epis"); }

  const set = (k: keyof Epi) => (v: any) => setDraft(d => d ? ({...d, [k]: v}) : d);

  return (
    <section className="space-y-3">
      <Link to="/epis" className="underline">← Voltar</Link>
      <h2 className="text-xl font-semibold">Editar EPI</h2>
      <div className="grid md:grid-cols-3 gap-2">
        <input className="border p-2" value={draft.nome} onChange={e=>set("nome")(e.target.value)} />
        <input className="border p-2" value={draft.ca} onChange={e=>set("ca")(e.target.value)} />
        <input className="border p-2" value={draft.fabricante ?? ""} onChange={e=>set("fabricante")(e.target.value)} />
        <input className="border p-2" type="date" value={draft.validadeCA} onChange={e=>set("validadeCA")(e.target.value)} />
        <input className="border p-2" type="number" value={draft.tempoUsoDias} onChange={e=>set("tempoUsoDias")(+e.target.value)} />
        <input className="border p-2" type="number" value={draft.estoqueMinimo} onChange={e=>set("estoqueMinimo")(+e.target.value)} />
        <input className="border p-2" type="number" value={draft.estoqueAtual} onChange={e=>set("estoqueAtual")(+e.target.value)} />
        <input className="border p-2" type="date" value={draft.dataCadastro} onChange={e=>set("dataCadastro")(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <button onClick={()=>nav("/epis")} className="px-3 py-1 rounded border">Cancelar</button>
        <button onClick={save} className="px-3 py-1 rounded bg-brand-primary text-white">Salvar</button>
      </div>
    </section>
  );
}
