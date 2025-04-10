"use client";

import { useKanbanStore } from "@/store/kanbanStore";
import { useState } from "react";
import EditUserModal from "../Modal/EditUserModal";
import Image from "next/image";

const Sidebar = () => {
  const { projects, activeProjectId, switchProject, removeProject } =
    useKanbanStore();
  const { userName, userRole } = useKanbanStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDeleteProject = (projectId: string) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este projeto?"
    );
    if (confirmDelete) {
      removeProject(projectId);
    }
  };

  return (
    <>
      <div className="z-[30]">
        <button
          className="lg:hidden h-[40px] w-[40px] flex items-center justify-center p-4 absolute top-10 right-4 z-50 bg-blue-500 text-white rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "❌" : "☰"}{" "}
        </button>

        <aside
          className={`fixed  bg-white inset-0 lg:relative lg:left-0 lg:w-64 w-full h-full shadow-md flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "left-0" : "-left-full"
          }`}
        >
          <div
            className="p-4 border-b-[5px] border-white cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Image
              src="/dark-logo.png"
              width={200}
              height={100}
              alt="Página em Construção"
            />
            <p className="text-sm text-gray-500">{userName ?? "Usuário"}</p>
            <p className="text-xs text-gray-400">{userRole ?? "Cargo"}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xl font-semibold text-center text-gray-400 mb-2">
              Projetos
            </h3>

            {projects.length === 0 ? (
              <p className="text-sm text-gray-500">
                Você ainda não tem projetos criados.
              </p>
            ) : (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    onClick={() => switchProject(project.id)}
                    className={`p-2 text-md rounded text-center cursor-pointer ${
                      project.id === activeProjectId
                        ? "bg-blue-200 text-blue-700 font-semibold"
                        : "hover:bg-gray-300 bg-gray-200"
                    }`}
                  >
                    {project.name}
                    
                    <button
                      className="text-sm text-red-600 ml-4"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteProject(project.id);
                      }}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t-[5px] border-white">
            <button className="w-full p-2 flex items-center justify-center gap-2 py-4 text-sm bg-gray-100 rounded hover:bg-gray-200">
              <span>⚙️</span> Configurações <br /> (Em breve)
            </button>
          </div>
        </aside>

        {/* Modal */}
        <EditUserModal isOpen={isEditing} onClose={() => setIsEditing(false)} />
      </div>
    </>
  );
};

export default Sidebar;
