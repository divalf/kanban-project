"use client";

import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { ProjectCard } from "@/types/kanban";
import { MessageSquare, Clock } from "lucide-react";
import clsx from "clsx";

interface CardProps {
  card: ProjectCard;
  index: number;
  onClick: () => void;
}

export function Card({ card, index, onClick }: CardProps) {
  const getPriorityTheme = (priority: string) => {
    switch (priority) {
      case "Urgente": return "bg-blue-50 text-blue-600";
      case "Alta": return "bg-red-50 text-red-600";
      case "Média": return "bg-purple-50 text-purple-600";
      case "Baixa": return "bg-emerald-50 text-emerald-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={(e) => {
            // Se o drag estiver acontecendo, não conta como clique para abrir modal
            if (snapshot.isDragging) return;
            onClick();
          }}
          className={clsx(
            "bg-white rounded-[20px] p-5 shadow-sm border transition-all duration-200 cursor-grab active:cursor-grabbing",
            snapshot.isDragging ? "shadow-lg border-indigo-300 ring-2 ring-indigo-200 opacity-90" : "border-gray-100 hover:shadow-md hover:border-gray-200"
          )}
        >
          <div className="mb-4">
            <span className={clsx("px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide", getPriorityTheme(card.priority))}>
              {card.priority}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 leading-tight mb-3 pr-4">{card.title}</h3>
          
          {card.description && (
            <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
              {card.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {card.teamAvatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border-[3px] border-white z-10"
                />
              ))}
              {card.teamAvatarUrls.length > 4 && (
                <div className="w-7 h-7 rounded-full border-[3px] border-white bg-indigo-100 flex items-center justify-center text-[9px] text-indigo-700 font-bold z-10">
                  +{card.teamAvatarUrls.length - 4}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
              <div className="flex items-center gap-1.5 hover:text-gray-600 transition-colors cursor-pointer">
                <MessageSquare size={14} />
                <span>{card.commentsCount}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-gray-600 transition-colors cursor-pointer">
                <Clock size={14} />
                <span>{card.tasksDone >= 1000 ? `${(card.tasksDone/1000).toFixed(1)}k` : card.tasksDone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
