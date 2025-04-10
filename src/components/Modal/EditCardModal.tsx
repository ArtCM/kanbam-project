"use client";

import { useState, useEffect } from "react";
import { Card, Priority } from "@/types/Project";
import { useKanbanStore } from "@/store/kanbanStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
  columnId: string;
}

const EditCardModal = ({ isOpen, onClose, card, columnId }: Props) => {
  const { updateCard } = useKanbanStore();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [assignee, setAssignee] = useState(card.assignedTo);
  const [priority, setPriority] = useState<Priority>(card.priority ?? "Média");

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
    setAssignee(card.assignedTo);
    setPriority(card.priority ?? "Média");
  }, [card]);

  const handleSave = () => {
    const updatedCard: Card = {
      ...card,
      title,
      description,
      assignedTo: assignee,
      priority,
    };

    updateCard(columnId, updatedCard);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Editar Tarefa</h2>

        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Responsável"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Prioridade</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="Urgente">Urgente</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
