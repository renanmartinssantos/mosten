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
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg"
        data-oid="78p.c8:"
      >
        <div className="container mx-auto px-4 py-3" data-oid="ttznkz.">
          <div className="flex items-center justify-between" data-oid="a20k1d6">
            {/* Logo */}
            <div className="flex items-center" data-oid="vqi7k7j">
              <h1 className="text-2xl font-bold text-white" data-oid="yb02-ul">
                🎬{" "}
                <span className="text-yellow-400" data-oid="9c..z6h">
                  Mosten
                </span>
              </h1>
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 max-w-2xl mx-8" data-oid="2:9yisp">
              <SearchBar data-oid="hkkb_1q" />
            </div>

            {/* User Section - Right */}
            <div className="flex items-center space-x-4" data-oid="l8__h3q">
              <AdminSwitch data-oid="uoob3.b" />

              {isLoading ? (
                <div
                  className="w-10 h-10 bg-gray-700 animate-pulse rounded-full"
                  data-oid="es1b2uy"
                ></div>
              ) : user ? (
                <div className="flex items-center space-x-3" data-oid="4t_dvbl">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="d4awq-w"
                  >
                    <div
                      className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                      data-oid="7e_bmhc"
                    >
                      <span
                        className="text-white text-sm font-bold"
                        data-oid="m976q1m"
                      >
                        {user.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span
                      className="text-white text-sm font-medium hidden md:block"
                      data-oid="w_9v4mk"
                    >
                      {user.nome}
                    </span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                    data-oid="ow1euuh"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuth}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                  data-oid="reyhcxu"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" data-oid="arp2rl-"></div>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          data-oid="4j4p9ph"
        />
      )}
    </>
  );
}
