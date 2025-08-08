"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { handleVote } from "@/app/actions";
import { useUser } from "@/contexts/UserContext";
import { FilmeComVotos } from "@/lib/definitions";

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
      <div className="bg-gray-50 py-12" data-oid="1gy4xx-">
        <div className="container mx-auto px-4" data-oid="5fvd9i5">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-oid="m44why7"
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                data-oid="m2e9l--"
              >
                <div className="h-80 bg-gray-300" data-oid="nm9-xn7"></div>
                <div className="p-4" data-oid="1ia9v9b">
                  <div
                    className="h-6 bg-gray-300 rounded mb-3"
                    data-oid="gazf.a4"
                  ></div>
                  <div className="flex gap-2" data-oid="wbkote3">
                    <div
                      className="h-12 bg-gray-300 rounded-lg flex-1"
                      data-oid="qxok9js"
                    ></div>
                    <div
                      className="h-12 bg-gray-300 rounded-lg flex-1"
                      data-oid="9sv6vwa"
                    ></div>
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
      <div className="bg-gray-50 py-20" data-oid="wifv-5o">
        <div className="container mx-auto px-4 text-center" data-oid="bu0velt">
          <div className="text-8xl mb-6" data-oid="2k0-055">
            🎬
          </div>
          <h3
            className="text-2xl font-bold text-gray-800 mb-4"
            data-oid="dkxegsu"
          >
            Nenhum filme cadastrado
          </h3>
          <p className="text-gray-600 text-lg" data-oid="s5sr6hq">
            Ative o modo Admin para cadastrar novos filmes!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12" data-oid="k11v9sm">
      <div className="container mx-auto px-4" data-oid="voyei4:">
        <h2
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
          data-oid="y2xk3:w"
        >
          Vote nos seus filmes favoritos
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-oid="bdu59vi"
        >
          {filmes.map((filme) => (
            <div
              key={filme.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              data-oid="569clk7"
            >
              {/* Movie Poster */}
              <div className="relative h-80" data-oid="u1ybfm0">
                <Image
                  src={filme.imagemUrl}
                  alt={filme.titulo}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-movie.png";
                  }}
                  data-oid="34b9vqi"
                />

                <div
                  className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"
                  data-oid="mps-ljg"
                >
                  {filme.genero}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4" data-oid="oqypwd9">
                <h3
                  className="text-lg font-bold text-gray-900 mb-3 line-clamp-2"
                  data-oid="e2k-jwp"
                >
                  {filme.titulo}
                </h3>

                {/* Vote Buttons */}
                <div className="flex gap-2" data-oid="ddvj26p">
                  <button
                    onClick={() => handleVoteClick(filme.id, 1)}
                    disabled={!user || votingFilmeId === filme.id}
                    className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      !user ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    data-oid="k4td3jb"
                  >
                    {votingFilmeId === filme.id ? (
                      <div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        data-oid="ac7.mqj"
                      ></div>
                    ) : (
                      <>
                        <span className="text-xl" data-oid="8l_tmgw">
                          👍
                        </span>
                        <span className="text-lg font-bold" data-oid=":hz8pl4">
                          {filme.gostei}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleVoteClick(filme.id, -1)}
                    disabled={!user || votingFilmeId === filme.id}
                    className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      !user ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    data-oid="j0ryflj"
                  >
                    {votingFilmeId === filme.id ? (
                      <div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        data-oid="p_jy4.i"
                      ></div>
                    ) : (
                      <>
                        <span className="text-xl" data-oid="e_r.aj5">
                          👎
                        </span>
                        <span className="text-lg font-bold" data-oid="fc0n5e_">
                          {filme.naoGostei}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {!user && (
                  <p
                    className="text-xs text-gray-500 text-center mt-2"
                    data-oid="ld00i8q"
                  >
                    Faça login para votar
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
