"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BoardData, ProjectCard, Priority, KanbanColumn } from "@/types/kanban";
import { initialData } from "@/data/mockData";
import { DropResult } from "@hello-pangea/dnd";

type Tab = "inicio" | "tarefas" | "usuarios" | "configuracoes";
type SubTab = "primary" | "secondary";
type SortOrder = "newest" | "oldest" | "priority";

interface AppContextProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  activeSubTab: SubTab;
  setActiveSubTab: (tab: SubTab) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  data: BoardData;
  setData: (data: BoardData) => void;
  onDragEnd: (result: DropResult) => void;
  addCard: (columnId: string, card: ProjectCard) => void;
  addColumn: (title: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("tarefas");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("primary");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<BoardData>(initialData);

  useEffect(() => {
    setData((prevData) => {
      const newColumns = { ...prevData.columns };
      let changed = false;

      Object.keys(newColumns).forEach(colId => {
        const col = newColumns[colId];
        const sortedCards = [...col.cards].sort((a, b) => {
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

        // check if changed
        const isDifferent = sortedCards.some((card, idx) => card.id !== col.cards[idx]?.id);
        if (isDifferent) {
          changed = true;
          newColumns[colId] = { ...col, cards: sortedCards };
        }
      });

      if (changed) {
        return { ...prevData, columns: newColumns };
      }
      return prevData;
    });
  }, [sortOrder]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cards);
      const [movedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, movedCard);

      const newColumn = { ...startColumn, cards: newCardIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startCardIds = Array.from(startColumn.cards);
    const [movedCard] = startCardIds.splice(source.index, 1);
    const updatedCard = { ...movedCard, status: finishColumn.title };

    const finishCardIds = Array.from(finishColumn.cards);
    finishCardIds.splice(destination.index, 0, updatedCard);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [startColumn.id]: { ...startColumn, cards: startCardIds },
        [finishColumn.id]: { ...finishColumn, cards: finishCardIds },
      },
    });
    console.log(`Card ${updatedCard.title} movido para ${finishColumn.title}. Disparando e-mail para ${updatedCard.clientEmail}...`);
  };

  const addCard = (columnId: string, card: ProjectCard) => {
    const column = data.columns[columnId];
    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: { ...column, cards: [card, ...column.cards] }
      }
    });
  };

  const addColumn = (title: string) => {
    const id = `col-${Date.now()}`;
    const colors: KanbanColumn["color"][] = [
      "blue", "yellow", "green", "gray", "purple", "red", "indigo", "pink", "orange"
    ];
    
    // Find colors already used by existing columns
    const usedColors = Object.values(data.columns).map(col => col.color);
    
    // Available colors are those not currently used
    const availableColors = colors.filter(c => !usedColors.includes(c));
    
    // If all colors are used (unlikely with 9 colors), fallback to all colors
    const colorPool = availableColors.length > 0 ? availableColors : colors;
    
    const randomColor = colorPool[Math.floor(Math.random() * colorPool.length)];
    
    setData({
      ...data,
      columns: {
        ...data.columns,
        [id]: {
          id,
          title,
          color: randomColor,
          cards: []
        }
      },
      columnOrder: [...data.columnOrder, id]
    });
  };

  const updateColumnTitle = (columnId: string, newTitle: string) => {
    const column = data.columns[columnId];
    
    // Atualizar o status (texto) dos cards dentro desta coluna
    const updatedCards = column.cards.map(card => ({
      ...card,
      status: newTitle
    }));

    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: { ...column, title: newTitle, cards: updatedCards }
      }
    });
  };

  return (
    <AppContext.Provider      value={{
        activeTab,
        setActiveTab,
        activeSubTab,
        setActiveSubTab,
        sortOrder,
        setSortOrder,
        searchQuery,
        setSearchQuery,
        data,
        setData,
      onDragEnd, addCard, addColumn, updateColumnTitle
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
