"use client";

import { useEffect, useState } from "react";
import { useKanbanStore } from "@/store/kanbanStore";
import ProjectModal from "../Modal/ProjectModal";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeProject = useKanbanStore((state) => state.getActiveProject());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="flex items-center justify-start gap-20 px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-semibold">
          {mounted
            ? activeProject?.name || "Nome do Projeto"
            : "Nome do Projeto"}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Criar novo projeto +
        </button>
      </header>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
