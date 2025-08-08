"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AdminContextType = {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <AdminContext.Provider
      value={{ isAdminMode, toggleAdminMode }}
      data-oid="86m7jkm"
    >
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

export default function AdminSwitch() {
  const { isAdminMode, toggleAdminMode } = useAdmin();

  return (
    <div className="flex items-center space-x-2" data-oid="cza9ci0">
      <span className="text-sm text-gray-600" data-oid="bp_e9kn">
        Admin Mode:
      </span>
      <button
        onClick={toggleAdminMode}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          isAdminMode ? "bg-primary-600" : "bg-gray-200"
        }`}
        data-oid="zwsjvy8"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isAdminMode ? "translate-x-6" : "translate-x-1"
          }`}
          data-oid="irdz.h1"
        />
      </button>
      <span
        className={`text-sm font-medium ${isAdminMode ? "text-primary-600" : "text-gray-400"}`}
        data-oid="n75hrqo"
      >
        {isAdminMode ? "ON" : "OFF"}
      </span>
    </div>
  );
}
