"use client";

import { useState, useEffect } from "react";
import { FilmeComVotos } from "@/lib/definitions";
import { ClapperboardIcon, HeartCrackIcon, HeartIcon } from "lucide-react";

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
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total de Filmes */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClapperboardIcon className="text-white"></ClapperboardIcon>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats.totalFilmes.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Total de Filmes</div>
          </div>

          {/* Total de Gostei */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="text-white"></HeartIcon>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.totalGostei.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">
              Total de Votos "Gostei"
            </div>
          </div>

          {/* Total de Não Gostei */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartCrackIcon className="text-white"></HeartCrackIcon>
            </div>
            <div className="text-4xl font-bold text-red-600 mb-2">
              {stats.totalNaoGostei.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">
              Total de Votos "Não Gostei"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
