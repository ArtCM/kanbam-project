"use client";

import { useState } from "react";
import { Column as ColumnType } from "@/types/Project";
import Card from "../Card/Card";
import { useKanbanStore } from "@/store/kanbanStore";
import TaskModal from "../Modal/TaskModal";

interface ColumnProps {
  column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
  const { draggedCard, moveCard, reorderCard, clearDraggedCard, removeColumn } =
    useKanbanStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleDrop = (toIndex: number) => {
    if (!draggedCard) return;

    if (draggedCard.columnId === column.id) {
      const fromIndex = column.cards.findIndex(
        (c) => c.id === draggedCard.cardId
      );
      if (fromIndex === -1 || toIndex === undefined) return;

      reorderCard(column.id, fromIndex, toIndex);
    } else {
      moveCard(draggedCard.cardId, draggedCard.columnId, column.id);
    }

    clearDraggedCard();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    const confirmed = confirm(`Deseja excluir a coluna "${column.title}"?`);
    if (confirmed) removeColumn(column.id);
  };

  return (
    <>
      <div
        onDrop={() => {
          const toIndex = column.cards.length; 
          handleDrop(toIndex);
        }}
        onDragOver={handleDragOver}
        className="w-64 bg-gray-200 rounded p-3 shadow min-h-[200px] h-full relative"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">{column.title}</h2>
          <button
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-600"
            title="Excluir coluna"
          >
            🗑
          </button>
        </div>

        <div className="space-y-2 mb-3 mt-3">
          {column.cards.map((card, index) => (
            <div
              key={card.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              <Card card={card} columnId={column.id} />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          + Adicionar Tarefa
        </button>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        columnId={column.id}
      />
    </>
  );
};

export default Column;
