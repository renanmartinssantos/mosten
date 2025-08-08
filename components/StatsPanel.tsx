"use client";

import { useState, useEffect } from "react";
import { FilmeComVotos } from "@/lib/definitions";

export default function StatsPanel() {
  const [stats, setStats] = useState({
    totalFilmes: 0,
    totalGostei: 0,
    totalNaoGostei: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/filmes");
      if (response.ok) {
        const filmes: FilmeComVotos[] = await response.json();

        const totalGostei = filmes.reduce(
          (total, filme) => total + parseInt(filme.gostei),
          0,
        );

        const totalNaoGostei = filmes.reduce(
          (total, filme) => total + parseInt(filme.naoGostei),
          0,
        );

        setStats({
          totalFilmes: filmes.length,
          totalGostei,
          totalNaoGostei,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white py-12" data-oid="2489m.b">
        <div className="container mx-auto px-4" data-oid="wxd5t7:">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-oid="v1.6jyw"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-center animate-pulse"
                data-oid="85aoncf"
              >
                <div
                  className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"
                  data-oid="gso_2k4"
                ></div>
                <div
                  className="h-8 bg-gray-300 rounded w-24 mx-auto mb-2"
                  data-oid="e6v6281"
                ></div>
                <div
                  className="h-4 bg-gray-300 rounded w-32 mx-auto"
                  data-oid="hh69bi6"
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 border-b" data-oid="pe2wlzh">
      <div className="container mx-auto px-4" data-oid="sxwzdz:">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-oid="686nzwv"
        >
          {/* Total de Filmes */}
          <div className="text-center" data-oid="z8b1dsj">
            <div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              data-oid="wba88kz"
            >
              <span className="text-2xl" data-oid="v_zggid">
                🎬
              </span>
            </div>
            <div
              className="text-4xl font-bold text-gray-900 mb-2"
              data-oid="nken5n:"
            >
              {stats.totalFilmes.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium" data-oid="b75dhrd">
              Total de Filmes
            </div>
          </div>

          {/* Total de Gostei */}
          <div className="text-center" data-oid="m77cia.">
            <div
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
              data-oid="j9p.ao-"
            >
              <span className="text-2xl" data-oid="ac-ph66">
                👍
              </span>
            </div>
            <div
              className="text-4xl font-bold text-green-600 mb-2"
              data-oid="ccx8chj"
            >
              {stats.totalGostei.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium" data-oid="nz2m9ty">
              Total de Votos "Gostei"
            </div>
          </div>

          {/* Total de Não Gostei */}
          <div className="text-center" data-oid="2sxf5a1">
            <div
              className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
              data-oid="4hz69fj"
            >
              <span className="text-2xl" data-oid=".0.8wr9">
                👎
              </span>
            </div>
            <div
              className="text-4xl font-bold text-red-600 mb-2"
              data-oid="nno9x4q"
            >
              {stats.totalNaoGostei.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium" data-oid=":w6epy2">
              Total de Votos "Não Gostei"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
