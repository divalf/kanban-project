"use client";

import { Board } from "@/components/kanban/Board";
import { DashboardView } from "@/components/views/DashboardView";
import { TasksListView } from "@/components/views/TasksListView";
import { UsersView } from "@/components/views/UsersView";
import { SettingsView } from "@/components/views/SettingsView";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { activeTab, activeSubTab } = useAppContext();

  return (
    <div className="h-full flex flex-col min-w-max border-t border-gray-100/50">
      <div className="flex-1 overflow-x-auto overflow-y-auto w-full custom-scrollbar pb-4">
        {activeSubTab === "secondary" ? (
          <div className="p-8 h-full">
            <TasksListView />
          </div>
        ) : (
          <>
            {activeTab === "inicio" && <DashboardView />}
            {activeTab === "tarefas" && (
              <div className="p-8 h-full">
                <Board />
              </div>
            )}
            {activeTab === "usuarios" && <UsersView />}
            {activeTab === "configuracoes" && <SettingsView />}
          </>
        )}
      </div>
    </div>
  );
}
