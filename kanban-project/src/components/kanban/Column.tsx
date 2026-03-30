"use client";

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { KanbanColumn, ProjectCard } from "@/types/kanban";
import { Card } from "./Card";
import { Plus, Edit2, Check, X } from "lucide-react";
import clsx from "clsx";
import { useAppContext } from "@/context/AppContext";

interface ColumnProps {
  column: KanbanColumn;
  onAddCard: (columnId: string) => void;
  onCardClick: (card: ProjectCard) => void;
}

export function Column({ column, onAddCard, onCardClick }: ColumnProps) {
  const colorMap = {
    blue: {
      pillBg: "bg-indigo-500",
      text: "text-white",
      badgeBg: "bg-indigo-600",
      btnBg: "bg-indigo-500",
      btnText: "text-white",
      btnHover: "hover:bg-indigo-600",
    },
    yellow: {
      pillBg: "bg-amber-400",
      text: "text-white",
      badgeBg: "bg-amber-500",
      btnBg: "bg-amber-400",
      btnText: "text-white",
      btnHover: "hover:bg-amber-500",
    },
    green: {
      pillBg: "bg-emerald-500",
      text: "text-white",
      badgeBg: "bg-emerald-600",
      btnBg: "bg-emerald-500",
      btnText: "text-white",
      btnHover: "hover:bg-emerald-600",
    },
    gray: {
      pillBg: "bg-gray-200",
      text: "text-gray-800",
      badgeBg: "bg-gray-300",
      btnBg: "bg-gray-200",
      btnText: "text-gray-600",
      btnHover: "hover:bg-gray-300",
    },
    purple: {
      pillBg: "bg-purple-500",
      text: "text-white",
      badgeBg: "bg-purple-600",
      btnBg: "bg-purple-500",
      btnText: "text-white",
      btnHover: "hover:bg-purple-600",
    },
    red: {
      pillBg: "bg-rose-500",
      text: "text-white",
      badgeBg: "bg-rose-600",
      btnBg: "bg-rose-500",
      btnText: "text-white",
      btnHover: "hover:bg-rose-600",
    },
    indigo: {
      pillBg: "bg-violet-500",
      text: "text-white",
      badgeBg: "bg-violet-600",
      btnBg: "bg-violet-500",
      btnText: "text-white",
      btnHover: "hover:bg-violet-600",
    },
    pink: {
      pillBg: "bg-pink-500",
      text: "text-white",
      badgeBg: "bg-pink-600",
      btnBg: "bg-pink-500",
      btnText: "text-white",
      btnHover: "hover:bg-pink-600",
    },
    orange: {
      pillBg: "bg-orange-500",
      text: "text-white",
      badgeBg: "bg-orange-600",
      btnBg: "bg-orange-500",
      btnText: "text-white",
      btnHover: "hover:bg-orange-600",
    }
  };

  const { updateColumnTitle } = useAppContext();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(column.title);

  const theme = colorMap[column.color as keyof typeof colorMap] || colorMap.gray;

  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      updateColumnTitle(column.id, editedTitle.trim());
    } else {
      setEditedTitle(column.title); // reset on cancel/empty
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col flex-1 min-w-[340px] max-w-[340px] h-full">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className={clsx("flex items-center gap-3 px-4 py-2 rounded-full", theme.pillBg, theme.text, "max-w-[80%]")}>
          <span className={clsx("w-6 h-6 rounded-full flex shrink-0 items-center justify-center text-xs font-bold", theme.badgeBg)}>
            {column.cards.length}
          </span>
          {isEditing ? (
            <div className="flex items-center gap-2 w-full">
              <input 
                autoFocus
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') {
                    setEditedTitle(column.title);
                    setIsEditing(false);
                  }
                }}
                className="bg-white/20 text-white placeholder-white/50 border-none outline-none focus:ring-1 focus:ring-white rounded px-2 py-0.5 text-sm font-semibold w-full"
              />
              <button onClick={handleSaveTitle} className="p-1 hover:bg-white/20 rounded">
                <Check size={14} />
              </button>
              <button 
                onClick={() => {
                  setEditedTitle(column.title);
                  setIsEditing(false);
                }} 
                className="p-1 hover:bg-white/20 rounded"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-hidden w-full group">
              <h2 className="font-semibold text-sm truncate" title={column.title}>{column.title}</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 ml-auto hover:bg-black/10 rounded-full flex-shrink-0"
                title="Editar título da coluna"
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => onAddCard(column.id)}
          className={clsx("w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm", theme.btnBg, theme.btnText, theme.btnHover)}
          title={`Adicionar novo em ${column.title}`}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              "flex-1 space-y-4 overflow-y-auto px-1 pb-4 transition-colors rounded-xl",
              snapshot.isDraggingOver ? "bg-gray-100" : "bg-transparent"
            )}
          >
            {column.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} onClick={() => onCardClick(card)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
