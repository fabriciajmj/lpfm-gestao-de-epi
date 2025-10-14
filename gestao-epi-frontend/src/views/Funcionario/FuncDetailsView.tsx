import { useParams, Link, useNavigate } from "react-router-dom";
import { useFuncionariosController } from "../../controllers/useFuncionariosController";
import { useEffect, useState } from "react";
import type { Funcionario } from "../../models/domain";

export default function FuncDetailsView() {
  const { id } = useParams();
  const nav = useNavigate();
  const { funcionarios, updateFuncionario } = useFuncionariosController();
  const [draft, setDraft] = useState<Funcionario | null>(null);

  useEffect(() => {
    const f = funcionarios.find(x => String(x.id) === id);
    if (f) setDraft(f);
  }, [funcionarios, id]);

  if (!draft) return (
    <section>
      <p>Funcionário não encontrado.</p>
      <Link className="underline" to="/funcionarios">← Voltar</Link>
    </section>
  );

  const set = (k: keyof Funcionario) => (v: any) => setDraft(d => d ? ({...d, [k]: v}) : d);
  function save(){ updateFuncionario(draft); nav("/funcionarios"); }

  return (
    <section className="space-y-3">
      <Link to="/funcionarios" className="underline">← Voltar</Link>
      <h2 className="text-xl font-semibold">Editar Funcionário</h2>
      <div className="grid md:grid-cols-3 gap-2">
        <input className="border p-2" value={draft.matricula} onChange={e=>set("matricula")(e.target.value)} />
        <input className="border p-2" value={draft.nomeCompleto} onChange={e=>set("nomeCompleto")(e.target.value)} />
        <input className="border p-2" value={draft.funcao ?? ""} onChange={e=>set("funcao")(e.target.value)} />
        <input className="border p-2" value={draft.setor ?? ""} onChange={e=>set("setor")(e.target.value)} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={draft.ativo} onChange={e=>set("ativo")(e.target.checked)} /> Ativo</label>
        <input className="border p-2" type="date" value={draft.dataCadastro} onChange={e=>set("dataCadastro")(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <button onClick={()=>nav("/funcionarios")} className="px-3 py-1 rounded border">Cancelar</button>
        <button onClick={save} className="px-3 py-1 rounded bg-brand-primary text-white">Salvar</button>
      </div>
    </section>
  );
}
