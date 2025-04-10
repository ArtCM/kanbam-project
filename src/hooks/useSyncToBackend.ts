"use client";

import { useEffect } from "react";
import { useKanbanStore } from "@/store/kanbanStore";

export const useSyncToBackend = () => {
  const { userName, userRole, projects } = useKanbanStore();

  useEffect(() => {
    const handleUnload = () => {
      fetch("http://localhost:3001/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userRole, projects }),
      });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [userName, userRole, projects]);
};
