'use client'

import { useState } from 'react'
import { useKanbanStore } from '@/store/kanbanStore'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EditUserModal = ({ isOpen, onClose }: Props) => {
  const { userName, userRole, setUserInfo } = useKanbanStore()
  const [name, setName] = useState(userName || '')
  const [role, setRole] = useState(userRole || '')

  const handleSave = () => {
    if (!name.trim() || !role.trim()) return
    setUserInfo(name.trim(), role.trim())
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Editar Informações</h2>

        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Seu cargo"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

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
  )
}

export default EditUserModal
