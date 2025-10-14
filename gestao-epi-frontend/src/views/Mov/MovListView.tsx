import { useMovsController } from "../../controllers/useMovsController";
import { useEffect, useMemo, useState } from "react";
import { getSnapshot } from "../../services/snapshot";

export default function MovListView() {
  const { movs, loading, err, createMov, deleteMov } = useMovsController();
  const [catalog, setCatalog] = useState<{epis: any[]; funcionarios: any[]}>({epis:[], funcionarios:[]});
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState({ funcionario: 0, epi: 0, dataEntrega: new Date().toISOString().slice(0,10),
    dataDevolucao: "", motivoTroca: "", dataVencimentoUso: "", observacoes: "" });

  useEffect(() => {
    getSnapshot().then(s => {
      if (s) setCatalog({ epis: s.epis, funcionarios: s.funcionarios });
    });
  }, []);

  const rows = useMemo(() => movs.map(m => ({
    ...m,
    funcionarioNome: catalog.funcionarios.find(f=>f.id===m.funcionario)?.nomeCompleto ?? `#${m.funcionario}`,
    epiNome: catalog.epis.find(e=>e.id===m.epi)?.nome ?? `#${m.epi}`
  })), [movs, catalog]);

  function submit() {
    if (!draft.funcionario || !draft.epi) { alert("Funcionário e EPI são obrigatórios"); return; }
    createMov({
      funcionario: draft.funcionario,
      epi: draft.epi,
      dataEntrega: draft.dataEntrega,
      dataDevolucao: draft.dataDevolucao || null,
      motivoTroca: draft.motivoTroca || null,
      dataVencimentoUso: draft.dataVencimentoUso || draft.dataEntrega,
      observacoes: draft.observacoes || null
    } as any);
    setFormOpen(false);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Movimentações ({rows.length})</h2>
        <button onClick={()=>setFormOpen(v=>!v)} className="px-3 py-1 rounded bg-brand-primary text-white">Nova</button>
      </div>
      {loading && <p className="text-gray-400">Carregando…</p>}
      {err && <p className="text-red-500">Erro: {err}</p>}

      {formOpen && (
        <div className="grid md:grid-cols-4 gap-2 border border-gray-600 p-3 rounded bg-gray-700">
          <select className="border border-gray-600 bg-gray-800 text-white p-2" value={draft.funcionario} onChange={e=>setDraft({...draft,funcionario:+e.target.value})}>
            <option value={0}>Selecione funcionário</option>
            {catalog.funcionarios.map(f=> <option key={f.id} value={f.id}>{f.nomeCompleto}</option>)}
          </select>
          <select className="border border-gray-600 bg-gray-800 text-white p-2" value={draft.epi} onChange={e=>setDraft({...draft,epi:+e.target.value})}>
            <option value={0}>Selecione EPI</option>
            {catalog.epis.map(e=> <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="date" value={draft.dataEntrega} onChange={e=>setDraft({...draft,dataEntrega:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="date" value={draft.dataVencimentoUso} onChange={e=>setDraft({...draft,dataVencimentoUso:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Motivo troca" value={draft.motivoTroca} onChange={e=>setDraft({...draft,motivoTroca:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Observações" value={draft.observacoes} onChange={e=>setDraft({...draft,observacoes:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" type="date" value={draft.dataDevolucao} onChange={e=>setDraft({...draft,dataDevolucao:e.target.value})}/>
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
              <th className="border-b border-gray-600 p-3 text-left">Funcionário</th>
              <th className="border-b border-gray-600 p-3 text-left">EPI</th>
              <th className="border-b border-gray-600 p-3">Entrega</th>
              <th className="border-b border-gray-600 p-3">Vencimento</th>
              <th className="border-b border-gray-600 p-3">Devolução</th>
              <th className="border-b border-gray-600 p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(m => (
              <tr key={m.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors text-gray-200">
                <td className="p-3">{m.funcionarioNome}</td>
                <td className="p-3">{m.epiNome}</td>
                <td className="p-3 text-center">{m.dataEntrega}</td>
                <td className="p-3 text-center">{m.dataVencimentoUso}</td>
                <td className="p-3 text-center">{m.dataDevolucao ?? "-"}</td>
                <td className="p-3 text-center">
                  <button onClick={()=>deleteMov(m.id)} className="text-red-500 underline">Excluir</button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td className="p-3 text-gray-500" colSpan={6}>Sem dados.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}