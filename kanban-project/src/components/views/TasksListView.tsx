import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle2, Clock, AlertTriangle, MessageSquare } from "lucide-react";

export function TasksListView() {
  const { data, sortOrder } = useAppContext();

  // Sort logic
  const allCards = Object.values(data.columns).flatMap(col => col.cards);
  
  const sortedCards = [...allCards].sort((a, b) => {
    if (sortOrder === "priority") {
      const pMap = { "Urgente": 4, "Alta": 3, "Média": 2, "Baixa": 1 };
      if (pMap[b.priority] !== pMap[a.priority]) {
        return pMap[b.priority] - pMap[a.priority];
      }
      return b.id.localeCompare(a.id, undefined, { numeric: true });
    }
    if (sortOrder === "oldest") {
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    }
    // newest layout (default)
    return b.id.localeCompare(a.id, undefined, { numeric: true });
  });

  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case "Urgente": return "bg-blue-50 text-blue-600";
      case "Alta": return "bg-red-50 text-red-600";
      case "Média": return "bg-purple-50 text-purple-600";
      case "Baixa": return "bg-emerald-50 text-emerald-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto animate-in fade-in duration-300">
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-500 whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-[20px]">Tarefa / Projeto</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Prioridade</th>
                <th className="px-6 py-4">Progresso ({sortOrder})</th>
                <th className="px-6 py-4">Interações</th>
                <th className="px-6 py-4 rounded-tr-[20px]">Cliente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedCards.map(card => {
                const isCompleted = card.tasksDone === card.tasksTotal && card.tasksTotal > 0;
                
                return (
                  <tr key={card.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 truncate max-w-[300px]" title={card.title}>
                          {card.title}
                        </span>
                        <span className="text-xs text-gray-400 mt-1 uppercase">ID: {card.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200/50">
                        {card.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${getPriorityClasses(card.priority)}`}>
                        {card.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                           <CheckCircle2 size={16} className="text-emerald-500" />
                        ) : (
                           <Clock size={16} className="text-amber-500" />
                        )}
                        <span className={`font-semibold ${isCompleted ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {card.tasksDone}/{card.tasksTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <MessageSquare size={14} />
                        <span className="text-xs font-medium">{card.commentsCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 font-medium truncate max-w-[200px]" title={card.clientEmail}>
                        {card.clientEmail}
                      </span>
                    </td>
                 </tr>
                );
              })}
              {sortedCards.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Nenhuma tarefa encontrada no momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
