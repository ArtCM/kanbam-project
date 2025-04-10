'use client'

import { useState } from 'react'
import { useKanbanStore } from '@/store/kanbanStore'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ isOpen, onClose }: ProjectModalProps) => {
  const { createProject } = useKanbanStore()
  const [name, setName] = useState('')

  const handleCreate = () => {
    if (!name.trim()) return
    createProject(name.trim())
    setName('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Novo Projeto</h2>

        <input
          type="text"
          placeholder="Nome do projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded outline-blue-500 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
