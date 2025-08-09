"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { handleVote } from "@/app/actions";
import { useUser } from "@/contexts/UserContext";
import { FilmeComVotos } from "@/lib/definitions";
import { HeartCrackIcon, HeartIcon } from "lucide-react";

export default function MovieGrid() {
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
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100"
              >
                <div className="h-80 bg-gradient-to-b from-gray-200 to-gray-300"></div>
                <div className="p-6">
                  <div className="flex gap-3">
                    <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
                    <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">🎬</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Nenhum filme cadastrado
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ative o modo Admin para cadastrar novos filmes e começar a votação!
            </p>
            <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">
                💡 Dica: Use o botão Admin no header
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Vote nos seus filmes favoritos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubra, vote e compartilhe sua opinião sobre os melhores filmes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filmes.map((filme) => (
            <div
              key={filme.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Movie Poster */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={filme.imagemUrl}
                  alt={filme.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-movie.png";
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Genre Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  {filme.genero}
                </div>

                {/* Movie Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg line-clamp-2">
                    {filme.titulo}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Movie Description */}
                {filme.descricao && (
                  <div className="mb-4 flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {filme.descricao}
                    </p>
                  </div>
                )}

                {/* Vote Stats */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <HeartIcon className="w-4 h-4 text-green-500"></HeartIcon>
                        <span className="text-sm font-semibold text-green-600">
                          {filme.gostei}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HeartCrackIcon className="w-4 h-4 text-red-500"></HeartCrackIcon>
                        <span className="text-sm font-semibold text-red-600">
                          {filme.naoGostei}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {parseInt(filme.gostei) + parseInt(filme.naoGostei)} votos
                    </div>
                  </div>
                  
                  {/* Progress Bar for Vote Ratio */}
                  {(parseInt(filme.gostei) + parseInt(filme.naoGostei)) > 0 && (
                    <div className="w-full bg-red-400 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(parseInt(filme.gostei) / (parseInt(filme.gostei) + parseInt(filme.naoGostei))) * 100}%`
                        }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Vote Buttons */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleVoteClick(filme.id, 1)}
                    disabled={!user || votingFilmeId === filme.id}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      !user ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {votingFilmeId === filme.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <HeartIcon className="w-4 h-4"></HeartIcon>
                        <span className="text-sm font-bold">Gostei</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleVoteClick(filme.id, -1)}
                    disabled={!user || votingFilmeId === filme.id}
                    className={`flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      !user ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {votingFilmeId === filme.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <HeartCrackIcon className="w-4 h-4"></HeartCrackIcon>
                        <span className="text-sm font-bold">Não Gostei</span>
                      </>
                    )}
                  </button>
                </div>

                {!user && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-700 text-center font-medium">
                      🔐 Faça login para votar
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
