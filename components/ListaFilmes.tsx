"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { handleVote } from "@/app/actions";
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

export default function ListaFilmes() {
  const [filmes, setFilmes] = useState<FilmeComVotos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votingFilmeId, setVotingFilmeId] = useState<number | null>(null);
  const { user } = useUser();

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

  const handleVoteClick = async (filmeId: number, tipoVoto: number) => {
    if (!user) {
      alert("Você precisa estar logado para votar!");
      return;
    }

    setVotingFilmeId(filmeId);

    try {
      const result = await handleVote(filmeId, tipoVoto);
      if (result.success) {
        // Atualizar a lista de filmes
        await fetchFilmes();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao votar:", error);
      alert("Erro ao registrar voto. Tente novamente.");
    } finally {
      setVotingFilmeId(null);
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  if (filmes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhum filme cadastrado
        </h3>
        <p className="text-gray-500">
          Ative o modo Admin para cadastrar novos filmes!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filmes.map((filme) => (
        <div key={filme.id} className="card hover:shadow-lg transition-shadow">
          <div className="relative mb-4">
            <Image
              src={filme.imagemUrl}
              alt={filme.titulo}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "";
              }}
            />

            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {filme.genero}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {filme.titulo}
          </h3>

          {filme.descricao && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {filme.descricao}
            </p>
          )}

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleVoteClick(filme.id, 1)}
              disabled={!user || votingFilmeId === filme.id}
              className={`btn btn-success flex-1 flex items-center justify-center gap-2 ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {votingFilmeId === filme.id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>👍 {filme.gostei}</>
              )}
            </button>

            <button
              onClick={() => handleVoteClick(filme.id, -1)}
              disabled={!user || votingFilmeId === filme.id}
              className={`btn btn-danger flex-1 flex items-center justify-center gap-2 ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {votingFilmeId === filme.id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>👎 {filme.naoGostei}</>
              )}
            </button>
          </div>

          {!user && (
            <p className="text-xs text-gray-500 text-center">
              Faça login para votar
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
