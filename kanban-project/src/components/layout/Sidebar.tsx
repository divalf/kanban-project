"use client";

import React from "react";
import { 
  Home, 
  CheckSquare, 
  Users, 
  Settings,
  Search,
  CheckCircle2
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function Sidebar() {
  const { activeTab, setActiveTab, data, searchQuery, setSearchQuery } = useAppContext();

  const allCards = Object.values(data.columns).flatMap(col => col.cards);
  const totalCards = allCards.length;
  const uniqueUsers = Array.from(new Set(allCards.map(c => c.clientEmail).filter(Boolean))).length;

  return (
    <aside className="w-64 bg-indigo-600 text-white flex flex-col h-screen font-sans">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-indigo-600 font-bold">
          <CheckSquare size={20} className="fill-current text-indigo-600" />
        </div>
        <span className="text-xl font-bold tracking-wide">TaskFlow</span>
      </div>

      <div className="px-5 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" size={16} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-indigo-500/50 border border-transparent focus:bg-indigo-500 focus:border-indigo-400 outline-none rounded-lg py-2 pl-9 pr-4 text-sm text-white transition-all placeholder:text-indigo-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        <NavItem icon={<Home size={18} />} label="Início" badge={totalCards} active={activeTab === 'inicio'} onClick={() => setActiveTab('inicio')} />
        <NavItem icon={<CheckCircle2 size={18} />} label="Tarefas" active={activeTab === 'tarefas'} onClick={() => setActiveTab('tarefas')} />
        <NavItem icon={<Users size={18} />} label="Usuários" badge={uniqueUsers} active={activeTab === 'usuarios'} onClick={() => setActiveTab('usuarios')} />
        <NavItem icon={<Settings size={18} />} label="Configurações" active={activeTab === 'configuracoes'} onClick={() => setActiveTab('configuracoes')} />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, badge, onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: number, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${active ? 'bg-indigo-700/50 font-medium' : 'hover:bg-indigo-500/30'}`}>
      <div className="flex items-center gap-3 text-indigo-50">
        <span className="opacity-80">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge !== undefined && (
        <span className="bg-white text-indigo-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
