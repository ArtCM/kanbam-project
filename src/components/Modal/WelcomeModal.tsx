'use client'

import { useEffect, useState } from 'react'
import { useKanbanStore } from '@/store/kanbanStore'

const WelcomeModal = () => {
    const { userName, userRole, setUserInfo, hasHydrated } = useKanbanStore()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    if (!hasHydrated) return
    if (!userName || !userRole) {
      setIsOpen(true)
    }
  }, [hasHydrated, userName, userRole])

  const handleSave = () => {
    if (!name.trim() || !role.trim()) return
    setUserInfo(name.trim(), role.trim())
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 flex flex-col gap-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Bem-vindo ao Kanbam!</h2>
        <p className="mb-4 text-sm text-gray-600">Informe seus dados para personalizar a experiência:</p>

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

        <div className="flex justify-end">
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

export default WelcomeModal
