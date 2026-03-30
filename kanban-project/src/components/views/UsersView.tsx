import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Mail, Search, Hash } from "lucide-react";

export function UsersView() {
  const { data, searchQuery, setSearchQuery } = useAppContext();
  
  const allCards = Object.values(data.columns).flatMap(col => col.cards);
  
  // Agrupar usuários pelos emails e contar a quantidade de projetos vinculados
  const userMap = allCards.reduce((acc, card) => {
    if (card.clientEmail) {
      if (!acc[card.clientEmail]) {
        acc[card.clientEmail] = { email: card.clientEmail, totalProjects: 0 };
      }
      acc[card.clientEmail].totalProjects += 1;
    }
    return acc;
  }, {} as Record<string, { email: string, totalProjects: number }>);

  const users = Object.values(userMap)
    .filter(u => u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.totalProjects - a.totalProjects);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Clientes e Automações</h1>
          <p className="text-gray-500 mt-2 text-sm">Esta lista rastreia todos os clientes de projetos para fins de notificação.</p>
        </div>
        
        {/* Usamos a mesma string de pesquisa global ou definimos uma local se for viável, 
            neste caso estamos re-usando o search query. */}
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Buscar clientes por email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-[11px] font-bold text-gray-400">
                <th className="p-4 px-6">Cliente (E-mail)</th>
                <th className="p-4 px-6 text-center">Total de Projetos</th>
                <th className="p-4 px-6 text-right">Status de Automação</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-50">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 px-6 flex items-center gap-4 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900">{user.email}</span>
                  </td>
                  <td className="p-4 px-6 text-center border-x border-gray-50/50">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold leading-none">
                      <Hash size={12} />
                      {user.totalProjects}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right text-emerald-600 flex items-center justify-end gap-2 text-xs font-bold leading-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ativo para E-mails
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-gray-500 bg-gray-50/30">
                    Nenhum cliente encontrado. Crie novos cards com e-mails vinculados ou reveja sua busca.
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
