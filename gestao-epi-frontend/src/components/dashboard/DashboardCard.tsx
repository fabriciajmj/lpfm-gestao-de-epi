import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: "blue" | "green" | "red" | "purple";
  to: string;
}

// Mapas de cores para ícones (cores de destaque no tema escuro)
const colorMap = {
  blue: "bg-blue-800/30 text-blue-400",
  green: "bg-green-800/30 text-green-400",
  red: "bg-red-800/30 text-red-400",
  purple: "bg-purple-800/30 text-purple-400",
};

export default function DashboardCard({ title, value, subtitle, icon, color, to }: DashboardCardProps) {
  return (
    <Link to={to} className="block h-full">
      {/* Card com fundo escuro (mais claro que o fundo da página), bordas suaves e hover sutil */}
      <div className="flex flex-col justify-between p-6 h-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl hover:border-brand-primary transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{title}</p>
          {/* Ícone com fundo colorido */}
          <div className={`p-3 rounded-xl ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
        
        {/* Valor principal em destaque */}
        <p className="text-5xl font-extrabold text-white">{value}</p>
        
        {/* Subtítulo/Detalhe */}
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      </div>
    </Link>
  );
}