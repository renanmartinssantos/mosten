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
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-oid="15o8y6x"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse" data-oid="wvedbfw">
            <div
              className="bg-gray-300 h-64 rounded mb-4"
              data-oid="n5gh_pc"
            ></div>
            <div
              className="h-4 bg-gray-300 rounded mb-2"
              data-oid="rqx1fgc"
            ></div>
            <div
              className="h-3 bg-gray-300 rounded w-3/4 mb-4"
              data-oid="el29u5y"
            ></div>
            <div className="flex gap-2" data-oid="tban95q">
              <div
                className="h-8 bg-gray-300 rounded flex-1"
                data-oid="6koohub"
              ></div>
              <div
                className="h-8 bg-gray-300 rounded flex-1"
                data-oid="p27dzqe"
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className="text-center py-12" data-oid="c5u-7b9">
        <div className="text-6xl mb-4" data-oid="lqe_xyf">
          🎬
        </div>
        <h3
          className="text-xl font-semibold text-gray-700 mb-2"
          data-oid="z.htkgt"
        >
          Nenhum filme cadastrado
        </h3>
        <p className="text-gray-500" data-oid="vrx07g-">
          Ative o modo Admin para cadastrar novos filmes!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-oid="x9pddwn"
    >
      {filmes.map((filme) => (
        <div
          key={filme.id}
          className="card hover:shadow-lg transition-shadow"
          data-oid="x80nmg:"
        >
          <div className="relative mb-4" data-oid="hen38n0">
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
              data-oid="s5-i2qq"
            />

            <div
              className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
              data-oid="wgm-1tg"
            >
              {filme.genero}
            </div>
          </div>

          <h3
            className="text-lg font-semibold mb-2 line-clamp-2"
            data-oid="_w2iq6m"
          >
            {filme.titulo}
          </h3>

          {filme.descricao && (
            <p
              className="text-gray-600 text-sm mb-4 line-clamp-3"
              data-oid="289.7f2"
            >
              {filme.descricao}
            </p>
          )}

          <div className="flex gap-2 mb-4" data-oid="mjmrzfm">
            <button
              onClick={() => handleVoteClick(filme.id, 1)}
              disabled={!user || votingFilmeId === filme.id}
              className={`btn btn-success flex-1 flex items-center justify-center gap-2 ${
                !user ? "opacity-50 cursor-not-allowed" : ""
              }`}
              data-oid="-1zxovj"
            >
              {votingFilmeId === filme.id ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  data-oid="zkchgrc"
                ></div>
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
              data-oid="re6wbba"
            >
              {votingFilmeId === filme.id ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  data-oid="m7_ktwd"
                ></div>
              ) : (
                <>👎 {filme.naoGostei}</>
              )}
            </button>
          </div>

          {!user && (
            <p className="text-xs text-gray-500 text-center" data-oid="ymynkcb">
              Faça login para votar
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
