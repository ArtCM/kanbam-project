'use client'

import { useKanbanStore } from '@/store/kanbanStore'

const Sidebar = () => {
  const {
    projects,
    activeProjectId,
    switchProject,
  } = useKanbanStore()

  return (
    <aside className="w-64 h-full bg-white border-r shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Kanbam</h2>
        <p className="text-sm text-gray-500">Arthur Correa</p>
        <p className="text-xs text-gray-400">Desenvolvedor</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Projetos</h3>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-500">Você ainda não tem projetos criados.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                onClick={() => switchProject(project.id)}
                className={`p-2 text-sm rounded cursor-pointer ${
                  project.id === activeProjectId
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {project.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t">
        <button className="w-full p-2 text-sm bg-gray-100 rounded hover:bg-gray-200">
          ⚙️ Configurações (em breve)
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
