import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Card } from '@/types/Project'

interface DraggedCard {
  cardId: string
  columnId: string
}

interface KanbanState {
  projects: Project[]
  activeProjectId: string | null
  draggedCard: DraggedCard | null

  // Getters
  activeProject: Project | null

  // Ações
  createProject: (name: string) => void
  switchProject: (id: string) => void

  addColumn: (title: string) => void
  removeColumn: (columnId: string) => void

  addCard: (columnId: string, card: Card) => void
  removeCard: (columnId: string, cardId: string) => void
  moveCard: (cardId: string, sourceColId: string, targetColId: string) => void

  setDraggedCard: (cardId: string, columnId: string) => void
  clearDraggedCard: () => void
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      draggedCard: null,

      get activeProject() {
        const { projects, activeProjectId } = get()
        return projects.find((p) => p.id === activeProjectId) ?? null
      },

      createProject: (name) => {
        const newProject: Project = {
          id: crypto.randomUUID(),
          name,
          columns: [],
        }

        set((state) => ({
          projects: [...state.projects, newProject],
          activeProjectId: newProject.id,
        }))
      },

      switchProject: (id) => {
        set({ activeProjectId: id })
      },

      addColumn: (title) => {
        const { activeProjectId, projects } = get()
        if (!activeProjectId) return

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: [...p.columns, { id: crypto.randomUUID(), title, cards: [] }],
              }
            : p
        )

        set({ projects: updatedProjects })
      },

      removeColumn: (columnId) => {
        const { activeProjectId, projects } = get()
        if (!activeProjectId) return

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.filter((col) => col.id !== columnId),
              }
            : p
        )

        set({ projects: updatedProjects })
      },

      addCard: (columnId, card) => {
        const { activeProjectId, projects } = get()
        if (!activeProjectId) return

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
        )

        set({ projects: updatedProjects })
      },

      removeCard: (columnId, cardId) => {
        const { activeProjectId, projects } = get()
        if (!activeProjectId) return

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
        )

        set({ projects: updatedProjects })
      },

      moveCard: (cardId, sourceColId, targetColId) => {
        const { activeProjectId, projects } = get()
        if (!activeProjectId) return

        const project = projects.find((p) => p.id === activeProjectId)
        if (!project) return

        const sourceColumn = project.columns.find((c) => c.id === sourceColId)
        const targetColumn = project.columns.find((c) => c.id === targetColId)
        if (!sourceColumn || !targetColumn) return

        const cardToMove = sourceColumn.cards.find((c) => c.id === cardId)
        if (!cardToMove) return

        const updatedCard: Card = { ...cardToMove, status: targetColId }

        const updatedProjects = projects.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                columns: p.columns.map((col) => {
                  if (col.id === sourceColId) {
                    return {
                      ...col,
                      cards: col.cards.filter((c) => c.id !== cardId),
                    }
                  }
                  if (col.id === targetColId) {
                    return {
                      ...col,
                      cards: [...col.cards, updatedCard],
                    }
                  }
                  return col
                }),
              }
            : p
        )

        set({ projects: updatedProjects })
      },

      setDraggedCard: (cardId, columnId) => {
        set({ draggedCard: { cardId, columnId } })
      },

      clearDraggedCard: () => {
        set({ draggedCard: null })
      },
    }),
    {
      name: 'kanban-multi-projects',
    }
  )
)
