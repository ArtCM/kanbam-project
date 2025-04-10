'use client'

import { useState } from 'react'
import { useKanbanStore } from '@/store/kanbanStore'
import { Card } from '@/types/Project'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  columnId: string
}

const priorities = ['Baixa', 'Média', 'Alta', 'Urgente'] as const

const TaskModal = ({ isOpen, onClose, columnId }: TaskModalProps) => {
  const { addCard } = useKanbanStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [priority, setPriority] = useState<Card['priority']>('Baixa')

  const handleSubmit = () => {
    if (!title.trim()) return

    const newCard: Card = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      assignedTo: assignedTo.trim() || 'Sem responsável',
      status: columnId,
      priority,
    }

    addCard(columnId, newCard)
    setTitle('')
    setDescription('')
    setAssignedTo('')
    setPriority('Baixa')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Nova Tarefa</h2>

        <div className="grid gap-3">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded outline-blue-500"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded outline-blue-500"
          />
          <input
            type="text"
            placeholder="Responsável"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded outline-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Card['priority'])}
            className="w-full p-2 border rounded outline-blue-500"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                Prioridade: {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
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
  )
}

export default TaskModal
