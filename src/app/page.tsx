'use client'

import { useSyncToBackend } from '@/hooks/useSyncToBackend'

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Board from "../components/Board/Board";
import WelcomeModal from "../components/Modal/WelcomeModal";

export default function HomePage() {
  useSyncToBackend()

  return (
    <div className="flex h-screen w-full overflow-y-hidden bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 overflow-hidden">
          <Board />
        </main>
      </div>

      <WelcomeModal />
    </div>
  );
}
