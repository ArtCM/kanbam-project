"use client";

import { useState } from "react";
import { useKanbanStore } from "@/store/kanbanStore";

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColumnModal = ({ isOpen, onClose }: ColumnModalProps) => {
  const { addColumn } = useKanbanStore();
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    addColumn(title.trim());
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Nova Coluna</h2>

        <input
          type="text"
          placeholder="Título da coluna"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4 outline-blue-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnModal;
