import { useEpisController } from "../../controllers/useEpisController";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Epi } from "../../models/domain";

export default function EpiListView() {
  const { epis, loading, err, total, createEpi, deleteEpi } = useEpisController();
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Epi,"id">>({
    nome:"", ca:"", fabricante:null, validadeCA:"", tempoUsoDias:0,
    estoqueMinimo:0, estoqueAtual:0, dataCadastro:new Date().toISOString().slice(0,10)
  });

  function submit() {
    if(!draft.nome || !draft.ca) { alert("Nome e CA são obrigatórios"); return; }
    createEpi(draft);
    setFormOpen(false);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">EPIs ({total})</h2>
        <button onClick={()=>setFormOpen(v=>!v)} className="px-3 py-1 rounded bg-brand-primary text-white">Novo EPI</button>
      </div>

      {loading && <p className="text-gray-400">Carregando…</p>}
      {err && <p className="text-red-500">Erro: {err}</p>}

      {formOpen && (
        <div className="grid md:grid-cols-4 gap-2 border border-gray-600 p-3 rounded bg-gray-700">
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Nome" value={draft.nome} onChange={e=>setDraft({...draft,nome:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="CA" value={draft.ca} onChange={e=>setDraft({...draft,ca:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Fabricante" value={draft.fabricante??""} onChange={e=>setDraft({...draft,fabricante:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="date" value={draft.validadeCA} onChange={e=>setDraft({...draft,validadeCA:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="number" placeholder="Tempo Uso (dias)" value={draft.tempoUsoDias} onChange={e=>setDraft({...draft,tempoUsoDias:+e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="number" placeholder="Estoque Mínimo" value={draft.estoqueMinimo} onChange={e=>setDraft({...draft,estoqueMinimo:+e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="number" placeholder="Estoque Atual" value={draft.estoqueAtual} onChange={e=>setDraft({...draft,estoqueAtual:+e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="date" value={draft.dataCadastro} onChange={e=>setDraft({...draft,dataCadastro:e.target.value})}/>
          <div className="col-span-full flex gap-2 justify-end">
            <button onClick={()=>setFormOpen(false)} className="px-3 py-1 rounded border border-gray-600 text-gray-300 hover:bg-gray-700">Cancelar</button>
            <button onClick={submit} className="px-3 py-1 rounded bg-brand-primary text-white hover:bg-brand-primaryDark">Salvar</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="border-b border-gray-600 p-3 text-left">Nome</th>
              <th className="border-b border-gray-600 p-3 text-left">CA</th>
              <th className="border-b border-gray-600 p-3 text-right">Estoque</th>
              <th className="border-b border-gray-600 p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {epis.map(e => (
              <tr key={e.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors text-gray-200">
                <td className="p-3">{e.nome}</td>
                <td className="p-3">{e.ca}</td>
                <td className="p-3 text-right">{e.estoqueAtual}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <Link className="underline text-brand-link" to={`/epis/${e.id}`}>Detalhes</Link>
                  <button onClick={()=>deleteEpi(e.id)} className="text-red-500 underline">Excluir</button>
                </td>
              </tr>
            ))}
            {!epis.length && <tr><td className="p-3 text-gray-500" colSpan={4}>Sem dados.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}