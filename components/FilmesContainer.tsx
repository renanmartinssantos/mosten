"use client";

import { useState, useEffect } from "react";
import ListView from "./ListView";
import TinderSwipe from "./TinderSwipe";
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
      <div className="space-y-6" data-oid="42ggcid">
        {/* Header skeleton */}
        <div className="flex justify-between items-center" data-oid="z_a-lxn">
          <div
            className="h-8 bg-gray-300 rounded w-48 animate-pulse"
            data-oid="nxrvapi"
          ></div>
          <div
            className="h-10 bg-gray-300 rounded w-32 animate-pulse"
            data-oid="y41r3hw"
          ></div>
        </div>

        {/* Content skeleton based on view mode */}
        {viewMode === "list" ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="fhs9_n4"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse" data-oid="k:uh9nx">
                <div
                  className="bg-gray-300 h-64 rounded mb-4"
                  data-oid="bk9iuh8"
                ></div>
                <div
                  className="h-4 bg-gray-300 rounded mb-2"
                  data-oid="_u1rfma"
                ></div>
                <div
                  className="h-3 bg-gray-300 rounded w-3/4 mb-4"
                  data-oid="3sn1ubt"
                ></div>
                <div className="flex gap-2" data-oid="iorvoph">
                  <div
                    className="h-8 bg-gray-300 rounded flex-1"
                    data-oid="71m0nmv"
                  ></div>
                  <div
                    className="h-8 bg-gray-300 rounded flex-1"
                    data-oid="6_:.08k"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center space-y-6"
            data-oid="3h1jqv7"
          >
            <div className="w-full max-w-sm mx-auto" data-oid="umxsb4h">
              <div
                className="w-full h-[600px] bg-gray-300 rounded-2xl animate-pulse"
                data-oid="3k4k4.x"
              ></div>
            </div>
            <div className="flex space-x-8" data-oid="kph_90t">
              <div
                className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"
                data-oid=".7cl72d"
              ></div>
              <div
                className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"
                data-oid="_vzi3z_"
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-oid="wbajtp5">
      {/* Header com switch de visualização */}
      <div className="flex justify-between items-center" data-oid="yk9r.-u">
        <div data-oid="fo3ju3j">
          <h2 className="text-2xl font-bold text-gray-800" data-oid="i_9o5h2">
            {viewMode === "list" ? "Lista de Filmes" : "Swipe dos Filmes"}
          </h2>
          <p className="text-gray-600 text-sm" data-oid="125monr">
            {viewMode === "list"
              ? "Navegue pelos filmes e vote em seus favoritos"
              : "Deslize para curtir ou não curtir os filmes"}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-4" data-oid="v1f.wb0">
          <span
            className={`text-sm font-medium ${viewMode === "list" ? "text-primary-600" : "text-gray-500"}`}
            data-oid="_mwu3il"
          >
            📋 Lista
          </span>

          <button
            onClick={() => setViewMode(viewMode === "list" ? "swipe" : "list")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              viewMode === "swipe" ? "bg-primary-600" : "bg-gray-200"
            }`}
            data-oid="ekhskx_"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                viewMode === "swipe" ? "translate-x-6" : "translate-x-1"
              }`}
              data-oid="c9ucd:o"
            />
          </button>

          <span
            className={`text-sm font-medium ${viewMode === "swipe" ? "text-primary-600" : "text-gray-500"}`}
            data-oid="guyl1_8"
          >
            📱 Swipe
          </span>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="hm6oy3s">
        <div
          className="bg-white rounded-lg p-4 shadow-sm border"
          data-oid="21o25xg"
        >
          <div className="flex items-center space-x-2" data-oid="jebcrbt">
            <span className="text-2xl" data-oid="bf3vcqg">
              🎬
            </span>
            <div data-oid="-5eeqg:">
              <p className="text-sm text-gray-600" data-oid="1732ce9">
                Total de Filmes
              </p>
              <p className="text-xl font-bold text-gray-800" data-oid="hqo-fi.">
                {filmes.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-lg p-4 shadow-sm border"
          data-oid="ht14iae"
        >
          <div className="flex items-center space-x-2" data-oid="k:_pk8a">
            <span className="text-2xl" data-oid="chppfmd">
              ❤️
            </span>
            <div data-oid=".z8pxqv">
              <p className="text-sm text-gray-600" data-oid="od5ik26">
                Total de Likes
              </p>
              <p
                className="text-xl font-bold text-green-600"
                data-oid="a3soeq:"
              >
                {filmes.reduce(
                  (total, filme) => total + parseInt(filme.gostei),
                  0,
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-lg p-4 shadow-sm border"
          data-oid="8b5yb65"
        >
          <div className="flex items-center space-x-2" data-oid="djo2dxq">
            <span className="text-2xl" data-oid="n-3r1r5">
              💔
            </span>
            <div data-oid="oijskdq">
              <p className="text-sm text-gray-600" data-oid=":ke6ouc">
                Total de Dislikes
              </p>
              <p className="text-xl font-bold text-red-600" data-oid="i3aaa3y">
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
      {viewMode === "list" ? (
        <ListView
          filmes={filmes}
          onVoteComplete={handleVoteComplete}
          data-oid="tczfs3b"
        />
      ) : (
        <TinderSwipe
          filmes={filmes}
          onVoteComplete={handleVoteComplete}
          onLoginClick={handleLoginClick}
          data-oid="psp:6ri"
        />
      )}

      {/* Modal de Autenticação */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          data-oid="yawvrn6"
        />
      )}
    </div>
  );
}
