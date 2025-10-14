import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";

export default function AppLayout() {
  const link = "px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium";
  const active = "bg-brand-primary text-white shadow-lg"; // Abas ativas em destaque
  const inactive = "text-gray-300 hover:bg-gray-700 hover:text-white"; // Abas inativas

  return (
    // Fundo da aplicação em um tom escuro (slate-900, semelhante ao da referência)
    <div className="min-h-screen mx-auto max-w-7xl p-6 bg-slate-900 text-gray-100"> 
      
      <header className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-extrabold text-brand-primary mb-4 md:mb-0">Gestão de EPIs</h1>
        <nav className="flex flex-wrap gap-2 md:gap-4">
          <NavLink to="/" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>Dashboard</NavLink>
          <NavLink to="/epis" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>EPIs</NavLink>
          <NavLink to="/funcionarios" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>Funcionários</NavLink>
          <NavLink to="/movimentacoes" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>Movimentações</NavLink>
          <NavLink to="/privacy" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>Privacy</NavLink>
          <NavLink to="/about" className={({isActive}) => `${link} ${isActive ? active : inactive}`}>About</NavLink>
        </nav>
      </header>
      
      {/* Área principal de conteúdo - fundo ligeiramente mais claro que a página */}
      <main className="bg-gray-900 p-8 rounded-2xl shadow-2xl min-h-[calc(100vh-250px)]">
        <Suspense fallback={<div className="animate-pulse text-gray-500 p-8 text-center">Carregando…</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} • Gestão de EPIs
      </footer>
    </div>
  );
}