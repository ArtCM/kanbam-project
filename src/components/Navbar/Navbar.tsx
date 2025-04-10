'use client'

import { useState } from 'react'
import ProjectModal from '../Modal/ProjectModal'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-semibold">Nome do Projeto</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Criar novo projeto +
        </button>
      </header>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Navbar
