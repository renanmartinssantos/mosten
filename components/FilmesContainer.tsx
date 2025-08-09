"use client";

import { useState, useEffect } from "react";
import ListView from "./ListView";
import AuthModal from "./AuthModal";
import { useUser } from "@/contexts/UserContext";

type FilmeComVotos = {
  id: number;
  titulo: string;
  descricao: string | null;
  imagemUrl: string;
  genero: string;
  gostei: string;
  naoGostei: string;
};

type ViewMode = "list" | "swipe";

export default function FilmesContainer() {
  const [filmes, setFilmes] = useState<FilmeComVotos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { refreshUser } = useUser();

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const response = await fetch("/api/filmes");
      if (response.ok) {
        const data = await response.json();
        setFilmes(data);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoteComplete = async () => {
    await fetchFilmes();
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = async () => {
    setIsAuthModalOpen(false);
    await refreshUser();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>

        {/* Content skeleton based on view mode */}
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-300 h-64 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-300 rounded flex-1"></div>
                  <div className="h-8 bg-gray-300 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full h-[600px] bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex space-x-8">
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com switch de visualização */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {viewMode === "list" ? "Lista de Filmes" : "Swipe dos Filmes"}
          </h2>
          <p className="text-gray-600 text-sm">
            {viewMode === "list"
              ? "Navegue pelos filmes e vote em seus favoritos"
              : "Deslize para curtir ou não curtir os filmes"}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm font-medium ${viewMode === "list" ? "text-primary-600" : "text-gray-500"}`}
          >
            📋 Lista
          </span>

          <button
            onClick={() => setViewMode(viewMode === "list" ? "swipe" : "list")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              viewMode === "swipe" ? "bg-primary-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                viewMode === "swipe" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium ${viewMode === "swipe" ? "text-primary-600" : "text-gray-500"}`}
          >
            📱 Swipe
          </span>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <div>
              <p className="text-sm text-gray-600">Total de Filmes</p>
              <p className="text-xl font-bold text-gray-800">{filmes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">❤️</span>
            <div>
              <p className="text-sm text-gray-600">Total de Likes</p>
              <p className="text-xl font-bold text-green-600">
                {filmes.reduce(
                  (total, filme) => total + parseInt(filme.gostei),
                  0,
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💔</span>
            <div>
              <p className="text-sm text-gray-600">Total de Dislikes</p>
              <p className="text-xl font-bold text-red-600">
                {filmes.reduce(
                  (total, filme) => total + parseInt(filme.naoGostei),
                  0,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo baseado no modo de visualização */}
      <ListView filmes={filmes} onVoteComplete={handleVoteComplete} />

      {/* Modal de Autenticação */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
