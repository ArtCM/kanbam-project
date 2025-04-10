'use client'

import { useKanbanStore } from '@/store/kanbanStore'
import { Card as CardType } from '@/types/Project'

interface CardProps {
  card: CardType
}

const Card = ({ card }: CardProps) => {
  const { setDraggedCard, removeCard } = useKanbanStore()

  const handleDragStart = () => {
    setDraggedCard(card.id, card.status)
  }

  const handleRemove = () => {
    const confirmed = confirm(`Deseja excluir a tarefa "${card.title}"?`)
    if (confirmed) {
      removeCard(card.status, card.id)
    }
  }

  return (
    <div
      className="bg-white p-3 rounded shadow cursor-grab border-l-4 relative"
      draggable
      onDragStart={handleDragStart}
      style={{
        borderColor: card.priority === 'Urgente' ? '#ef4444' : '#3b82f6',
      }}
    >
      {/* Botão de excluir no canto superior direito */}
      <button
        onClick={handleRemove}
        title="Excluir tarefa"
        className="absolute top-1 right-1 text-gray-400 hover:text-red-600 text-xs"
      >
        🗑
      </button>

      <h3 className="font-medium">{card.title}</h3>
      <p className="text-sm text-gray-500">{card.description}</p>
      <div className="text-xs text-gray-400 mt-1">👤 {card.assignedTo}</div>
    </div>
  )
}

export default Card
