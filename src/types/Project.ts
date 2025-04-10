export type Priority = "Urgente" | "Alta" | "Média" | "Baixa";

export interface Card {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  assignedTo: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface Project {
  id: string;
  name: string;
  columns: Column[];
}

export interface KanbanData {
  projects: Project[];
  activeProjectId: string | null;
}
