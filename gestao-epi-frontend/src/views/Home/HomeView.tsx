import { useEpisController } from "../../controllers/useEpisController";
import { useFuncionariosController } from "../../controllers/useFuncionariosController";
import { useMovsController } from "../../controllers/useMovsController";
import DashboardCard from "../../components/dashboard/DashboardCard";

// Ícones simples (simulando icons de biblioteca)
const EpiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
const FuncIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const MovIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/></svg>;

export default function HomeView() {
  const { total: totalEpis, loading: loadingEpis } = useEpisController();
  const { total: totalFuncionarios, loading: loadingFuncionarios } = useFuncionariosController();
  const { movs, loading: loadingMovs } = useMovsController();
  
  const totalMovs = movs.length;
  const loading = loadingEpis || loadingFuncionarios || loadingMovs;

  // Placeholder para cálculos avançados (simulando dados de estoque)
  const epiOutros = totalEpis - 1; // Exemplo de cálculo

  return (
    <section className="space-y-10">
      <h2 className="text-3xl font-bold text-white">Visão Geral do Estoque e Distribuição</h2>

      {loading && <div className="animate-pulse text-gray-500">Carregando dados...</div>}

      {/* Seção de Cartões de Estatísticas (Grid 3 Colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total de EPIs Cadastrados" 
          value={totalEpis} 
          subtitle={`Em estoque: ${epiOutros}`}
          icon={<EpiIcon />} 
          color="blue"
          to="/epis" 
        />
        <DashboardCard 
          title="Total de Funcionários Ativos" 
          value={totalFuncionarios} 
          subtitle="Prontos para uso de EPIs"
          icon={<FuncIcon />} 
          color="green" 
          to="/funcionarios"
        />
        <DashboardCard 
          title="Movimentações Registradas" 
          value={totalMovs} 
          subtitle="Entregas e devoluções totais"
          icon={<MovIcon />} 
          color="purple" 
          to="/movimentacoes"
        />
      </div>

      {/* Seção de Tabelas/Detalhes (Layout de Duas Colunas Adaptado) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Card de Informações/Alertas */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Informações do Sistema</h3>
          <p className="text-gray-400">Este front carrega dados de snapshot local para funcionar offline/independente. As operações são armazenadas em fila (queue) no LocalStorage para futura sincronização com a API.</p>
        </div>

        {/* Card de Próximos Vencimentos (Placeholder) */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Próximos Vencimentos de CA</h3>
          <p className="text-gray-500">Nenhum alerta crítico nos próximos 30 dias.</p>
          {/* Aqui entraria uma tabela ou lista de alertas */}
        </div>

      </div>
    </section>
  );
}