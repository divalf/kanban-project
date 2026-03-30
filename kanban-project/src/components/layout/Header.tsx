"use client";

import React, { useState } from "react";
import { Search, Plus, Share2, ChevronDown } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function Header() {
  const { searchQuery, setSearchQuery, activeTab, activeSubTab, setActiveSubTab, sortOrder, setSortOrder } = useAppContext();
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 flex flex-col font-sans px-8 py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
          Dashboard Kanban <span role="img" aria-label="owl">🦉</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Pesquisar projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none w-64 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between mt-6">
        <ul className="flex items-center gap-6 text-sm font-medium text-gray-500 capitalize">
          <li 
            onClick={() => setActiveSubTab('primary')}
            className={`cursor-pointer pb-2 relative transition-colors ${activeSubTab === 'primary' ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600" : "hover:text-gray-900"}`}
          >
            {activeTab === 'tarefas' ? 'Por Status' : 'Visão Geral'}
          </li>
          <li 
            onClick={() => setActiveSubTab('secondary')}
            className={`cursor-pointer pb-2 relative transition-colors ${activeSubTab === 'secondary' ? "text-indigo-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600" : "hover:text-gray-900"}`}
          >
            Total de {activeTab === 'usuarios' ? 'Clientes' : 'Tarefas'}
          </li>
        </ul>

        <div className="flex items-center gap-2 text-sm text-gray-600 relative">
          <span>Ordenar por </span>
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="font-semibold text-gray-900 flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded"
          >
            {sortOrder === 'newest' ? 'Mais novos' : sortOrder === 'oldest' ? 'Mais antigos' : 'Prioridade'}
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg shadow-gray-200/50 py-2 z-50">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium"
                onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }}
              >
                Mais novos
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium"
                onClick={() => { setSortOrder('oldest'); setIsSortOpen(false); }}
              >
                Mais antigos
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-medium"
                onClick={() => { setSortOrder('priority'); setIsSortOpen(false); }}
              >
                Maior Prioridade
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
