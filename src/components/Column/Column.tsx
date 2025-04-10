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
  const { draggedCard, moveCard, clearDraggedCard, removeColumn } =
    useKanbanStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleDrop = () => {
    if (draggedCard && draggedCard.columnId !== column.id) {
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
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-64 bg-gray-100 rounded p-3 shadow min-h-[200px] relative"
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
          {column.cards.map((card) => (
            <Card key={card.id} card={card} columnId={column.id} />
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
