import { useFuncionariosController } from "../../controllers/useFuncionariosController";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Funcionario } from "../../models/domain";

export default function FuncListView() {
  const { funcionarios, total, loading, err, createFuncionario, deleteFuncionario } = useFuncionariosController();
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Funcionario,"id">>({
    matricula:"", nomeCompleto:"", funcao:"", setor:"", ativo:true,
    dataCadastro:new Date().toISOString().slice(0,10)
  });

  function submit() {
    if (!draft.matricula || !draft.nomeCompleto) { alert("Matrícula e Nome são obrigatórios"); return; }
    createFuncionario(draft);
    setFormOpen(false);
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Funcionários ({total})</h2>
        <button onClick={()=>setFormOpen(v=>!v)} className="px-3 py-1 rounded bg-brand-primary text-white">Novo</button>
      </div>
      {loading && <p className="text-gray-400">Carregando…</p>}
      {err && <p className="text-red-500">Erro: {err}</p>}

      {formOpen && (
        <div className="grid md:grid-cols-4 gap-2 border border-gray-600 p-3 rounded bg-gray-700">
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Matrícula" value={draft.matricula} onChange={e=>setDraft({...draft,matricula:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Nome completo" value={draft.nomeCompleto} onChange={e=>setDraft({...draft,nomeCompleto:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Função" value={draft.funcao??""} onChange={e=>setDraft({...draft,funcao:e.target.value})}/>
          <input className="border border-gray-600 bg-gray-800 text-white p-2" placeholder="Setor" value={draft.setor??""} onChange={e=>setDraft({...draft,setor:e.target.value})}/>
          <label className="flex items-center gap-2 text-gray-300"><input type="checkbox" checked={draft.ativo} onChange={e=>setDraft({...draft,ativo:e.target.checked})}/> Ativo</label>
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
              <th className="border-b border-gray-600 p-3 text-left">Matrícula</th>
              <th className="border-b border-gray-600 p-3 text-left">Nome</th>
              <th className="border-b border-gray-600 p-3 text-left">Setor</th>
              <th className="border-b border-gray-600 p-3 text-left">Função</th>
              <th className="border-b border-gray-600 p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map(f => (
              <tr key={f.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors text-gray-200">
                <td className="p-3">{f.matricula}</td>
                <td className="p-3">{f.nomeCompleto}</td>
                <td className="p-3">{f.setor ?? "-"}</td>
                <td className="p-3">{f.funcao ?? "-"}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <Link className="underline text-brand-link" to={`/funcionarios/${f.id}`}>Detalhes</Link>
                  <button onClick={()=>deleteFuncionario(f.id)} className="text-red-500 underline">Excluir</button>
                </td>
              </tr>
            ))}
            {!funcionarios.length && <tr><td className="p-3 text-gray-500" colSpan={5}>Sem dados.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}