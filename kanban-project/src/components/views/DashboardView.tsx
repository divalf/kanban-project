import React from "react";
import { useAppContext } from "@/context/AppContext";
import { LayoutTemplate, Rocket, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function DashboardView() {
  const { data, setActiveTab } = useAppContext();
  
  const allCards = Object.values(data.columns).flatMap(col => col.cards);
  const totalCards = allCards.length;

  // Calculo de porcentagens para cada coluna (Garantindo que a soma seja 100% no visual)
  const columnsWithStats = data.columnOrder.map(colId => {
    const col = data.columns[colId];
    const rawPct = totalCards ? Number(((col.cards.length / totalCards) * 100).toFixed(1)) : 0;
    return {
      ...col,
      rawPct
    };
  });

  // Ajustar o último para fechar 100% perfeitamente, se existirem cards
  if (totalCards > 0 && columnsWithStats.length > 0) {
    const sumExceptLast = columnsWithStats.slice(0, -1).reduce((acc, curr) => acc + curr.rawPct, 0);
    columnsWithStats[columnsWithStats.length - 1].rawPct = Number((100 - sumExceptLast).toFixed(1));
  }

  // Formatador para exibição em pt-BR (Ex: 37.5 -> 37,5%)
  const formatPct = (val: number) => `${Math.max(0, val)}`.replace('.', ',');

  // Gráfico de Barras de Prioridade
  const priorities = ["Urgente", "Alta", "Média", "Baixa"];
  const priorityCounts = priorities.map(p => ({
    name: p,
    count: allCards.filter(c => c.priority === p).length
  }));
  const maxPriorityCount = Math.max(...priorityCounts.map(p => p.count), 1); // evita divisão por zero

  const getBarColor = (priority: string) => {
    switch (priority) {
      case "Urgente": return "bg-blue-500";
      case "Alta": return "bg-red-500";
      case "Média": return "bg-purple-500";
      case "Baixa": return "bg-emerald-500";
      default: return "bg-indigo-500";
    }
  };

  const getColorHex = (colorName: string) => {
    switch (colorName) {
      case "blue": return "#6366f1";
      case "yellow": return "#fbbf24";
      case "green": return "#10b981";
      case "gray": return "#9ca3af";
      case "purple": return "#a855f7";
      case "red": return "#f43f5e";
      case "indigo": return "#8b5cf6";
      case "pink": return "#ec4899";
      case "orange": return "#f97316";
      default: return "#9ca3af";
    }
  };

  const getColorThemeClasses = (colorName: string) => {
    switch (colorName) {
      case "blue": return "bg-indigo-50 text-indigo-500";
      case "yellow": return "bg-amber-50 text-amber-500";
      case "green": return "bg-emerald-50 text-emerald-500";
      case "gray": return "bg-gray-100 text-gray-500";
      case "purple": return "bg-purple-50 text-purple-500";
      case "red": return "bg-rose-50 text-rose-500";
      case "indigo": return "bg-violet-50 text-violet-500";
      case "pink": return "bg-pink-50 text-pink-500";
      case "orange": return "bg-orange-50 text-orange-500";
      default: return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header do Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2">
            Visão Geral <span role="img" aria-label="owl">🦉</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Acompanhe todos os detalhes e métricas do seu Kanban.</p>
        </div>
        <button 
          onClick={() => setActiveTab('tarefas')}
          className="flex items-center gap-2 bg-[#5F48F9] hover:bg-[#4E39E0] text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm"
        >
          Ir para o Quadro
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card Projetos Totais */}
        <div className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <LayoutTemplate size={24} />
            </div>
            <span className="text-3xl font-black text-gray-900">{totalCards}</span>
          </div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Projetos Totais</span>
        </div>

        {/* Cards Dinâmicos por Coluna */}
        {columnsWithStats.map((col) => {
          return (
            <div key={col.id} className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 flex flex-col justify-between h-[120px]">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColorThemeClasses(col.color)}`}>
                  <Rocket size={24} />
                </div>
                <span className="text-3xl font-black" style={{ color: getColorHex(col.color) }}>{col.cards.length}</span>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider truncate" title={col.title}>
                {col.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Gráficos */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Distribuição do Ciclo de Vida */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-md font-bold text-gray-900 mb-6">Distribuição do Ciclo de Vida</h3>
            
            {/* Barra de Progresso Flexível */}
            <div className="w-full h-4 rounded-full flex overflow-hidden mb-5 bg-gray-100">
              {columnsWithStats.map(col => (
                <div 
                  key={col.id}
                  style={{ width: `${col.rawPct}%`, backgroundColor: getColorHex(col.color) }} 
                  className="h-full transition-all duration-500"
                  title={`${col.title}: ${formatPct(col.rawPct)}%`}
                ></div>
              ))}
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-6 mt-auto">
              {columnsWithStats.map(col => (
                <div key={col.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getColorHex(col.color) }}></div>
                  <span className="text-xs font-semibold text-gray-600 truncate max-w-[120px]" title={col.title}>
                    <span className="mr-1">{col.title}</span>
                    <span className="text-gray-900">{formatPct(col.rawPct)}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volume por Prioridade */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col h-[320px]">
            <h3 className="text-md font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-gray-400" />
              Volume por Prioridade
            </h3>
            
            <div className="flex-1 w-full relative mt-8 mb-6">
              {/* Linhas de grade horizontais fakes */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-gray-50/50 w-full h-0"></div>
                <div className="border-b border-gray-50/50 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0 border-dashed"></div>
              </div>

              {/* Barras e Eixos */}
              <div className="absolute inset-0 flex items-end justify-between px-2 gap-2">
                {priorityCounts.map((item, i) => {
                  const heightPct = item.count === 0 ? 0 : (item.count / maxPriorityCount) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center justify-end h-full flex-1 z-10 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        {item.count}
                      </div>
                      
                      {/* Container da barra */}
                      <div className="w-12 h-full flex items-end justify-center">
                        <div 
                          className={`w-full ${getBarColor(item.name)} rounded-t-[6px] transition-all duration-500`}
                          style={{ height: `${Math.max(heightPct, item.count > 0 ? 4 : 0)}%` }}
                        ></div>
                      </div>
                      
                      {/* Legenda Base */}
                      <span className="text-[10px] font-semibold text-gray-400 absolute -bottom-6 text-center w-[120%] whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Coluna Direita: Últimos Lançados */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 h-full max-h-[600px] flex flex-col">
          <h3 className="text-md font-bold text-gray-900 mb-6">Últimos Lançados</h3>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar pb-2">
            {[...allCards].reverse().map((card, i) => {
              
              // Define o tema do badge
              const getStatusTheme = (status: string) => {
                if(status === 'Concluído') return "bg-emerald-50 text-emerald-600";
                if(status === 'Em Revisão') return "bg-yellow-50 text-yellow-600";
                return "bg-indigo-50 text-indigo-600";
              };

              return (
                <div key={i} className="bg-white border text-left border-gray-100 rounded-[14px] p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wide ${getStatusTheme(card.status)}`}>
                      {card.status}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">{card.priority}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{card.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {card.description || "Nenhuma descrição informada para este projeto recém criado..."}
                  </p>
                </div>
              );
            })}
            
            {allCards.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-10">Nenhum projeto ainda.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
