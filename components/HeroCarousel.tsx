"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FilmeComVotos } from "@/lib/definitions";

export default function HeroCarousel() {
  const [filmes, setFilmes] = useState<FilmeComVotos[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopFilmes();
  }, []);

  useEffect(() => {
    if (filmes.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filmes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filmes.length]);

  const fetchTopFilmes = async () => {
    try {
      const response = await fetch("/api/filmes");
      if (response.ok) {
        const data = await response.json();
        // Pegar os 5 filmes mais votados
        const topFilmes = data
          .sort(
            (a: FilmeComVotos, b: FilmeComVotos) =>
              parseInt(b.gostei) +
              parseInt(b.naoGostei) -
              (parseInt(a.gostei) + parseInt(a.naoGostei)),
          )
          .slice(0, 5);
        setFilmes(topFilmes);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filmes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filmes.length) % filmes.length);
  };

  if (isLoading) {
    return (
      <div className="relative h-96 bg-gray-800 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">
            Carregando filmes em destaque...
          </div>
        </div>
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">Nenhum filme em destaque</h2>
          <p className="text-gray-300">Cadastre filmes para vê-los aqui!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96  overflow-hidden bg-gray-900">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {filmes.map((filme, index) => (
          <div key={filme.id} className="min-w-full relative">
            <Image
              src={filme.imagemUrl}
              alt={filme.titulo}
              fill
              className="object-cover object-top"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "";
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="container mx-auto">
                <div className="mb-2">
                  <span className="text-yellow-400 text-sm font-medium uppercase tracking-wide">
                    ⭐ Destaques da Semana
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">
                  {filme.titulo}
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded font-medium">
                    {filme.genero}
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{filme.gostei}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>👎</span>
                    <span>{filme.naoGostei}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {filmes.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {filmes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {filmes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-yellow-500"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
