"use client";

import { useEffect, useState } from "react";
import { useKanbanStore } from "@/store/kanbanStore";
import Column from "../Column/Column";
import ColumnModal from "../Modal/ColumnModal";
import Loading from "../Loading/Loading";

const Board = () => {
  const {
    getActiveProject,
    activeProjectId,
    reorderColumn,
    draggedColumnIndex,
    setDraggedColumnIndex,
    clearDraggedColumn,
  } = useKanbanStore();

  const activeProject = getActiveProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [activeProjectId]);

  if (isLoading) return <Loading />;

  if (!activeProject) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Nenhum projeto selecionado.
      </div>
    );
  }

  const handleDragStartColumn = (index: number) => {
    setDraggedColumnIndex(index);
  };

  const handleDropColumn = (toIndex: number) => {
    if (draggedColumnIndex === null || draggedColumnIndex === toIndex) return;
    reorderColumn(draggedColumnIndex, toIndex);
    clearDraggedColumn();
  };

  return (
    <>
      <div className="h-full p-4">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 w-max min-h-full pb-2">
            {activeProject.columns.map((column, index) => (
              <div
                key={column.id}
                draggable
                onDragStart={() => handleDragStartColumn(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropColumn(index)}
                className="select-none"
              >
                <Column column={column} />
              </div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="min-w-[250px] h-fit p-4 bg-gray-200 rounded hover:bg-gray-300"
            >
              ➕ Adicionar Coluna
            </button>
          </div>
        </div>
      </div>

      <ColumnModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Board;
