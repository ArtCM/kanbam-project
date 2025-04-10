"use client";

import { useKanbanStore } from "@/store/kanbanStore";
import { Card as CardType } from "@/types/Project";
import EditCardModal from "../Modal/EditCardModal";
import { useState } from "react";

interface CardProps {
  card: CardType;
  columnId: string;
}

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "Urgente":
      return "bg-red-500 text-white";
    case "Alta":
      return "bg-orange-500 text-white";
    case "Média":
      return "bg-yellow-400 text-black";
    case "Baixa":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const Card = ({ card, columnId }: CardProps) => {
  const { setDraggedCard, removeCard } = useKanbanStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = () => {
    setDraggedCard(card.id, card.status);
  };

  const handleRemove = () => {
    const confirmed = confirm(`Deseja excluir a tarefa "${card.title}"?`);
    if (confirmed) {
      removeCard(card.status, card.id);
    }
  };

  return (
    <div
      className="bg-white p-3 rounded shadow cursor-grab border-l-4 relative"
      draggable
      onDragStart={handleDragStart}
      style={{
        borderColor: card.priority === "Urgente" ? "#ef4444" : "#3b82f6",
      }}
    >
      {/* Botão de excluir no canto superior direito */}
      <button
        onClick={handleRemove}
        title="Excluir tarefa"
        className="absolute top-1 cursor-pointer right-2 text-gray-400 hover:text-red-600 text-xs"
      >
        🗑
      </button>

      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-1 cursor-pointer right-7 text-xs text-blue-500 hover:text-blue-700"
      >
        ✏️
      </button>

      <span
        className={`text-xs font-semibold px-2 py-1 rounded mb-2 inline-block ${getPriorityStyles(
          card.priority ?? ""
        )}`}
      >
        {card.priority}
      </span>

      <h3 className="font-medium">{card.title}</h3>
      <p className="text-sm text-gray-500">{card.description}</p>
      <div className="text-xs text-gray-400 mt-1">👤 {card.assignedTo}</div>

      <EditCardModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        card={card}
        columnId={columnId}
      />
    </div>
  );
};

export default Card;
