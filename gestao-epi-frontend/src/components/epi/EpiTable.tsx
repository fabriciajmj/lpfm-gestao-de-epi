import type { Epi } from "../../models/domain";
import { Link } from "react-router-dom";

export default function EpiTable({ epis }: { epis: Epi[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">CA</th>
            <th className="border p-2 text-right">Estoque</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {epis.map(e => (
            <tr key={e.id}>
              <td className="border p-2">{e.nome}</td>
              <td className="border p-2">{e.ca}</td>
              <td className="border p-2 text-right">{e.estoqueAtual}</td>
              <td className="border p-2 text-center">
                <Link to={`/epis/${e.id}`} className="underline">Detalhes</Link>
              </td>
            </tr>
          ))}
          {!epis.length && (
            <tr><td className="border p-2" colSpan={4}>Sem dados no snapshot.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
