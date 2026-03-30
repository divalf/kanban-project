export type Priority = "Urgente" | "Alta" | "Média" | "Baixa";

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  clientEmail: string;
  status: string;
  priority: Priority;
  commentsCount: number;
  tasksDone: number;
  tasksTotal: number;
  teamAvatarUrls: string[];
};

export type KanbanColumn = {
  id: string;
  title: string;
  color: "blue" | "yellow" | "green" | "gray" | "purple" | "red" | "indigo" | "pink" | "orange";
  cards: ProjectCard[];
};

export type BoardData = {
  columns: Record<string, KanbanColumn>;
  columnOrder: string[];
};
