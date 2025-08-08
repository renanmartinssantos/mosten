"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogoutClient } from "@/app/actions";
import AuthModal from "./AuthModal";
import AdminSwitch from "./AdminSwitch";
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
    // Atualizar o estado do usuário
    await refreshUser();
  };

  const handleLogoutClick = async () => {
    try {
      const result = await handleLogoutClient();
      if (result.success) {
        // Atualizar o contexto do usuário
        await refreshUser();
        // Redirecionar para a página inicial forçando um refresh
        router.push("/");
        router.refresh();
        // Como fallback, usar window.location.reload após um delay curto
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
      <header className="bg-white shadow-sm border-b" data-oid="7lv5..f">
        <div className="container mx-auto px-4 py-4" data-oid="6.vs2th">
          <div className="flex items-center justify-between" data-oid="3-b2.db">
            <div className="flex items-center space-x-4" data-oid="l13_kh.">
              <h1
                className="text-2xl font-bold text-primary-600"
                data-oid="em_qxc9"
              >
                🎬 Mosten
              </h1>
              <span className="text-gray-500 text-sm" data-oid="-0m_4s3">
                Sistema de Votação de Filmes
              </span>
            </div>

            <div className="flex items-center space-x-4" data-oid="zdwoijt">
              <AdminSwitch data-oid="kcd:364" />

              {isLoading ? (
                <div
                  className="w-24 h-8 bg-gray-200 animate-pulse rounded"
                  data-oid="psw9x4m"
                ></div>
              ) : user ? (
                <div className="flex items-center space-x-3" data-oid="2dhager">
                  <span className="text-sm text-gray-700" data-oid="yfl91mm">
                    Olá,{" "}
                    <span className="font-medium" data-oid="7skwpi:">
                      {user.nome}
                    </span>
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className="btn btn-secondary text-sm"
                    data-oid="x5k4680"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuth}
                  className="btn btn-primary"
                  data-oid="tphd.dg"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          data-oid="8cx3qd."
        />
      )}
    </>
  );
}
