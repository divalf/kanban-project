"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BoardData, ProjectCard, Priority } from "@/types/kanban";
import { Column } from "./Column";
import { useAppContext } from "@/context/AppContext";
import { Modal } from "@/components/ui/Modal";

import { Plus } from "lucide-react";

export function Board() {
  const { data, onDragEnd, addCard, addColumn, searchQuery } = useAppContext();

  // States for New Column
  const [isNewColumnModalOpen, setIsNewColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  // States for New Card
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [newCardColumnId, setNewCardColumnId] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [newCardEmail, setNewCardEmail] = useState("");
  const [newCardPriority, setNewCardPriority] = useState<Priority>("Média");

  // States for Viewing Card
  const [viewingCard, setViewingCard] = useState<ProjectCard | null>(null);

  useEffect(() => {
    // Listen to global event from Header
    const handleOpenNewCard = (e: any) => {
      const colId = e.detail || data.columnOrder[0];
      setNewCardColumnId(colId);
      setIsNewCardModalOpen(true);
    };

    window.addEventListener("open-new-card", handleOpenNewCard);
    return () => window.removeEventListener("open-new-card", handleOpenNewCard);
  }, [data.columnOrder]);



  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle || !newCardColumnId) return;

    const column = data.columns[newCardColumnId];
    
    const newCard: ProjectCard = {
      id: `card-${Date.now()}`,
      title: newCardTitle,
      description: newCardDesc,
      clientEmail: newCardEmail,
      status: column.title,
      priority: newCardPriority,
      commentsCount: 0,
      tasksDone: 0,
      tasksTotal: 10,
      teamAvatarUrls: ["https://i.pravatar.cc/150?u=99"],
    };

    addCard(newCardColumnId, newCard);

    // Reset and close
    setNewCardTitle("");
    setNewCardDesc("");
    setNewCardEmail("");
    setNewCardPriority("Média");
    setIsNewCardModalOpen(false);
  };

  const openNewCardModal = (columnId: string) => {
    setNewCardColumnId(columnId);
    setIsNewCardModalOpen(true);
  };

  const handleCreateColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    addColumn(newColumnTitle.trim());

    setNewColumnTitle("");
    setIsNewColumnModalOpen(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-160px)] gap-6 pb-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const filteredColumn = {
              ...column,
              cards: column.cards.filter(card => 
                card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                card.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
              )
            };
            return (
              <Column 
                key={column.id} 
                column={filteredColumn} 
                onAddCard={openNewCardModal}
                onCardClick={(card) => setViewingCard(card)}
              />
            );
          })}
          
          {/* Adicionar Nova Coluna */}
          <div className="min-w-[320px] max-w-[320px] flex-shrink-0">
            <button
              onClick={() => setIsNewColumnModalOpen(true)}
              className="w-full h-12 rounded-xl bg-white/50 border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50/50 transition-colors font-medium shadow-sm"
            >
              <Plus size={20} />
              Adicionar Nova Coluna
            </button>
          </div>
        </div>
      </DragDropContext>

      {/* Modal Criar Novo Card */}
      <Modal 
        isOpen={isNewCardModalOpen} 
        onClose={() => setIsNewCardModalOpen(false)}
        title="Criar Novo Projeto (Card)"
      >
        <form onSubmit={handleCreateCard} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto</label>
            <input 
              required
              autoFocus
              type="text" 
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Ex: Redesign do Formulário"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do Cliente (Regra de Negócio)</label>
            <input 
              required
              type="email" 
              value={newCardEmail}
              onChange={(e) => setNewCardEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="cliente@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição / Notas Iniciais</label>
            <textarea 
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-24 resize-none"
              placeholder="Descreva as tarefas e o fluxo do projeto..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select 
              value={newCardPriority}
              onChange={(e) => setNewCardPriority(e.target.value as Priority)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="Urgente">Urgente</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsNewCardModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Visualizar Detalhes */}
      <Modal 
        isOpen={!!viewingCard} 
        onClose={() => setViewingCard(null)}
        title={viewingCard?.title || "Detalhes do Projeto"}
      >
        {viewingCard && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex-1 min-w-[200px]">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Status Atual</p>
                <p className="font-bold text-gray-900">{viewingCard.status}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex-1 min-w-[200px]">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">E-mail Vinculado</p>
                <p className="font-medium text-gray-900">{viewingCard.clientEmail}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex-1 min-w-[150px]">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Prioridade</p>
                <p className="font-bold text-indigo-600">{viewingCard.priority}</p>
              </div>
            </div>

            <div className="bg-white border text-sm text-gray-700 leading-relaxed border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Descrição Completa</h4>
              {viewingCard.description ? (
                <p>{viewingCard.description}</p>
              ) : (
                <p className="text-gray-400 italic">Nenhuma descrição adicionada.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mx-1 mb-3">Logs de Eventos Automáticos</h4>
              <div className="bg-gray-50 border border-dashed border-gray-300 text-sm text-gray-500 rounded-xl p-6 text-center">
                Aqui ficará o histórico de envio dos e-mails quando o card pular de etapa. 
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
              <button 
                onClick={() => setViewingCard(null)}
                className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors font-medium mt-4"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Criar Nova Coluna */}
      <Modal 
        isOpen={isNewColumnModalOpen} 
        onClose={() => setIsNewColumnModalOpen(false)}
        title="Criar Nova Coluna"
      >
        <form onSubmit={handleCreateColumn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Coluna</label>
            <input 
              required
              autoFocus
              type="text" 
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Ex: Em Homologação"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsNewColumnModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
            >
              Criar Coluna
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
