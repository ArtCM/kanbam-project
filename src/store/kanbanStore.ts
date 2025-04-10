import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, Card } from "@/types/Project";

interface DraggedCard {
  cardId: string;
  columnId: string;
}

interface KanbanState {
  userName: string | null;
  userRole: string | null;
  setUserInfo: (name: string, role: string) => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  projects: Project[];
  activeProjectId: string | null;
  draggedCard: DraggedCard | null;

  // Ações
  createProject: (name: string) => void;
  switchProject: (id: string) => void;

  addColumn: (title: string) => void;
  removeColumn: (columnId: string) => void;

  addCard: (columnId: string, card: Card) => void;
  removeCard: (columnId: string, cardId: string) => void;
  updateCard: (columnId: string, updatedCard: Card) => void;
  moveCard: (cardId: string, sourceColId: string, targetColId: string) => void;

  setDraggedCard: (cardId: string, columnId: string) => void;
  clearDraggedCard: () => void;

  // Getter como função
  getActiveProject: () => Project | null;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      draggedCard: null,
      userName: null,
      userRole: null,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      setUserInfo: (name, role) => {
        set({ userName: name, userRole: role });
      },

      createProject: (name) => {
        const newProject: Project = {
          id: crypto.randomUUID(),
          name,
          columns: [],
        };

        set((state) => ({
          projects: [...state.projects, newProject],
          activeProjectId: newProject.id,
        }));
      },

      switchProject: (id) => {
        set({ activeProjectId: id });
      },

      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find((p) => p.id === activeProjectId) ?? null;
      },

      addColumn: (title) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: [
                  ...p.columns,
                  { id: crypto.randomUUID(), title, cards: [] },
                ],
              }
            : p
        );

        set({ projects: updatedProjects });
        console.log("Projetos atualizados:", updatedProjects); 
      },

      removeColumn: (columnId) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.filter((col) => col.id !== columnId),
              }
            : p
        );

        set({ projects: updatedProjects });
      },

      addCard: (columnId, card) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.map((col) =>
                  col.id === columnId
                    ? { ...col, cards: [...col.cards, card] }
                    : col
                ),
              }
            : p
        );

        set({ projects: updatedProjects });
      },

      updateCard: (columnId: string, updatedCard: Card) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const updatedProjects = projects.map((project) => {
          if (project.id !== activeProjectId) return project;

          return {
            ...project,
            columns: project.columns.map((col) =>
              col.id === columnId
                ? {
                    ...col,
                    cards: col.cards.map((card) =>
                      card.id === updatedCard.id ? updatedCard : card
                    ),
                  }
                : col
            ),
          };
        });

        set({ projects: updatedProjects });
      },

      removeCard: (columnId, cardId) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.map((col) =>
                  col.id === columnId
                    ? {
                        ...col,
                        cards: col.cards.filter((card) => card.id !== cardId),
                      }
                    : col
                ),
              }
            : p
        );

        set({ projects: updatedProjects });
      },

      moveCard: (cardId, sourceColId, targetColId) => {
        const { activeProjectId, projects } = get();
        if (!activeProjectId) return;

        const project = projects.find((p) => p.id === activeProjectId);
        if (!project) return;

        const sourceColumn = project.columns.find((c) => c.id === sourceColId);
        const targetColumn = project.columns.find((c) => c.id === targetColId);
        if (!sourceColumn || !targetColumn) return;

        const cardToMove = sourceColumn.cards.find((c) => c.id === cardId);
        if (!cardToMove) return;

        const updatedCard: Card = { ...cardToMove, status: targetColId };

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.map((col) => {
                  if (col.id === sourceColId) {
                    return {
                      ...col,
                      cards: col.cards.filter((c) => c.id !== cardId),
                    };
                  }
                  if (col.id === targetColId) {
                    return {
                      ...col,
                      cards: [...col.cards, updatedCard],
                    };
                  }
                  return col;
                }),
              }
            : p
        );

        set({ projects: updatedProjects });
      },

      setDraggedCard: (cardId, columnId) => {
        set({ draggedCard: { cardId, columnId } });
      },

      clearDraggedCard: () => {
        set({ draggedCard: null });
      },
    }),
    {
      name: "kanban-multi-projects",
      partialize: (state) => ({
        userName: state.userName,
        userRole: state.userRole,
        projects: state.projects,
        activeProjectId: state.activeProjectId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
);
