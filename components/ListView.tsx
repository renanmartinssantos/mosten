"use client";

import { useState } from "react";
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

type ListViewProps = {
  filmes: FilmeComVotos[];
  onVoteComplete: () => void;
};

export default function ListView({ filmes, onVoteComplete }: ListViewProps) {
  const [votingFilmeId, setVotingFilmeId] = useState<number | null>(null);
  const { user } = useUser();

  const handleVoteClick = async (filmeId: number, tipoVoto: number) => {
    if (!user) {
      alert("Você precisa estar logado para votar!");
      return;
    }

    setVotingFilmeId(filmeId);

    try {
      const result = await handleVote(filmeId, tipoVoto);
      if (result.success) {
        onVoteComplete();
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

  if (filmes.length === 0) {
    return (
      <div className="text-center py-12" data-oid="5lqrk.x">
        <div className="text-6xl mb-4" data-oid="55.yctk">
          🎬
        </div>
        <h3
          className="text-xl font-semibold text-gray-700 mb-2"
          data-oid="dnu_d_e"
        >
          Nenhum filme cadastrado
        </h3>
        <p className="text-gray-500" data-oid="dtgrziw">
          Ative o modo Admin para cadastrar novos filmes!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-oid="-b2syvc"
    >
      {filmes.map((filme) => (
        <div
          key={filme.id}
          className="card hover:shadow-lg transition-shadow"
          data-oid="qgpwp.q"
        >
          <div className="relative mb-4" data-oid="ww6x6ks">
            <Image
              src={filme.imagemUrl}
              alt={filme.titulo}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-movie.png";
              }}
              data-oid="3n01a23"
            />

            <div
              className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
              data-oid="x6lv5zy"
            >
              {filme.genero}
            </div>

            {/* Stats overlay */}
            <div
              className="absolute bottom-2 left-2 right-2 flex justify-between"
              data-oid="obvlwyi"
            >
              <div
                className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1"
                data-oid="qqn0efu"
              >
                <span data-oid="i2bcjru">❤️</span>
                <span data-oid="x4rm_73">{filme.gostei}</span>
              </div>
              <div
                className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1"
                data-oid="gervzeu"
              >
                <span data-oid="86s9_on">💔</span>
                <span data-oid="9gcsj98">{filme.naoGostei}</span>
              </div>
            </div>
          </div>

          <h3
            className="text-lg font-semibold mb-2 line-clamp-2"
            data-oid="j19kt33"
          >
            {filme.titulo}
          </h3>

          {filme.descricao && (
            <p
              className="text-gray-600 text-sm mb-4 line-clamp-3"
              data-oid="qb9-h8o"
            >
              {filme.descricao}
            </p>
          )}

          <div className="flex gap-2 mb-4" data-oid="nea7hry">
            <button
              onClick={() => handleVoteClick(filme.id, 1)}
              disabled={!user || votingFilmeId === filme.id}
              className={`btn btn-success flex-1 flex items-center justify-center gap-2 ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
              data-oid="qoi6nvf"
            >
              {votingFilmeId === filme.id ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  data-oid="fl:p7pz"
                ></div>
              ) : (
                <>❤️ {filme.gostei}</>
              )}
            </button>

            <button
              onClick={() => handleVoteClick(filme.id, -1)}
              disabled={!user || votingFilmeId === filme.id}
              className={`btn btn-danger flex-1 flex items-center justify-center gap-2 ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
              data-oid="m7xu73l"
            >
              {votingFilmeId === filme.id ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  data-oid="fa:.6e5"
                ></div>
              ) : (
                <>💔 {filme.naoGostei}</>
              )}
            </button>
          </div>

          {!user && (
            <p className="text-xs text-gray-500 text-center" data-oid="w:9kmxk">
              Faça login para votar
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
