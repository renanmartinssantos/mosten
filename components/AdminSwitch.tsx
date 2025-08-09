"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@/contexts/UserContext";

type AdminContextType = {
  isAdminMode: boolean;
  toggleAdminMode: (onLoginRequired?: () => void) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { user } = useUser();

  // Desativar modo admin quando user faz logout
  useEffect(() => {
    if (!user && isAdminMode) {
      setIsAdminMode(false);
    }
  }, [user, isAdminMode]);

  const toggleAdminMode = (onLoginRequired?: () => void) => {
    if (!user && !isAdminMode) {
      // Se não está logado e está tentando ativar o modo admin
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }
    
    setIsAdminMode(!isAdminMode);
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin deve ser usado dentro de AdminProvider");
  }
  return context;
}

export default function AdminSwitch({ onLoginRequired }: { onLoginRequired?: () => void }) {
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const { user } = useUser();

  const handleToggle = () => {
    toggleAdminMode(onLoginRequired);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-300">Admin Mode:</span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
          isAdminMode ? "bg-yellow-500" : "bg-gray-600"
        }`}
        title={!user && !isAdminMode ? "Faça login para ativar o modo Admin" : ""}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isAdminMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${isAdminMode ? "text-yellow-400" : "text-gray-400"}`}
      >
        {isAdminMode ? "ON" : "OFF"}
      </span>
    </div>
  );
}
