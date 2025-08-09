"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogoutClient } from "@/app/actions";
import AuthModal from "./AuthModal";
import AdminSwitch from "./AdminSwitch";
import SearchBar from "./SearchBar";
import { useUser } from "@/contexts/UserContext";

export default function Header() {
  const { user, isLoading, refreshUser } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = async () => {
    setIsAuthModalOpen(false);
    await refreshUser();
  };

  const handleLogoutClick = async () => {
    try {
      const result = await handleLogoutClient();
      if (result.success) {
        await refreshUser();
        router.push("/");
        router.refresh();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                🎬 <span className="text-yellow-400">Mosten Films</span>
              </h1>
            </div>

            {/* Search Bar - Center */}
            {/* <div className="flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div> */}

            {/* User Section - Right */}
            <div className="flex items-center space-x-4">
              <AdminSwitch onLoginRequired={handleAuth} />

              {isLoading ? (
                <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-full"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium hidden md:block">
                      {user.nome}
                    </span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuth}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14"></div>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}
