"use client";

import { useEffect, useState } from "react";
import { useKanbanStore } from "@/store/kanbanStore";
import Column from "../Column/Column";
import ColumnModal from "../Modal/ColumnModal";
import Loading from "../Loading/Loading";

const Board = () => {
  const activeProject = useKanbanStore((state) => state.getActiveProject());
  const activeProjectId = useKanbanStore((state) => state.activeProjectId);
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

  const hasColumns = activeProject.columns.length > 0;

  return (
    <>
      <div className="h-full p-4">
        {hasColumns ? (
          <div className="w-full h-full overflow-x-auto">
            <div className="flex gap-4 w-max min-h-full pb-2">
              {activeProject.columns.map((column) => (
                <Column key={column.id} column={column} />
              ))}

              <button
                onClick={() => setIsModalOpen(true)}
                className="min-w-[250px] h-fit p-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                ➕ Adicionar Coluna
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-500 text-lg">
              Você ainda não tem nenhuma coluna adicionada
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ➕ Criar primeira coluna
            </button>
          </div>
        )}
      </div>

      <ColumnModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Board;
