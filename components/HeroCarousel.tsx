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
      <div
        className="relative h-96 bg-gray-800 animate-pulse"
        data-oid="j.d9k_d"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-oid="8mj.y-b"
        >
          <div className="text-white text-lg" data-oid="d4_5jj3">
            Carregando filmes em destaque...
          </div>
        </div>
      </div>
    );
  }

  if (filmes.length === 0) {
    return (
      <div
        className="relative h-96 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center"
        data-oid="3d6g1tz"
      >
        <div className="text-center text-white" data-oid="0fip61s">
          <div className="text-6xl mb-4" data-oid="ej0n-jm">
            🎬
          </div>
          <h2 className="text-2xl font-bold mb-2" data-oid=":ozwilq">
            Nenhum filme em destaque
          </h2>
          <p className="text-gray-300" data-oid="t17jffi">
            Cadastre filmes para vê-los aqui!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-96 overflow-hidden bg-gray-900"
      data-oid="uec3lhy"
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        data-oid="a9iujm."
      >
        {filmes.map((filme, index) => (
          <div
            key={filme.id}
            className="min-w-full relative"
            data-oid="n7qdzd_"
          >
            <Image
              src={filme.imagemUrl}
              alt={filme.titulo}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-movie.png";
              }}
              data-oid="s2bu2g2"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              data-oid="roaivn_"
            />

            {/* Content */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8 text-white"
              data-oid="fva:eyu"
            >
              <div className="container mx-auto" data-oid="qk9miew">
                <h2
                  className="text-4xl font-bold mb-2 drop-shadow-lg"
                  data-oid="38jvy60"
                >
                  {filme.titulo}
                </h2>
                <div
                  className="flex items-center space-x-4 text-sm"
                  data-oid="vqu6pl-"
                >
                  <span
                    className="bg-yellow-500 text-gray-900 px-2 py-1 rounded font-medium"
                    data-oid="bklhvz3"
                  >
                    {filme.genero}
                  </span>
                  <span
                    className="flex items-center space-x-1"
                    data-oid="a-8alqp"
                  >
                    <span data-oid="3lmffqe">👍</span>
                    <span data-oid="9w-4dz_">{filme.gostei}</span>
                  </span>
                  <span
                    className="flex items-center space-x-1"
                    data-oid="t7hftsd"
                  >
                    <span data-oid="bls12r.">👎</span>
                    <span data-oid="5rsfe48">{filme.naoGostei}</span>
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
            data-oid="9nex45q"
          >
            <ChevronLeftIcon className="h-6 w-6" data-oid="nmgh4bs" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
            data-oid="_w6sub:"
          >
            <ChevronRightIcon className="h-6 w-6" data-oid="hotv65j" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {filmes.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
          data-oid="h:n90k3"
        >
          {filmes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-yellow-500"
                  : "bg-white bg-opacity-50"
              }`}
              data-oid="j-c9bol"
            />
          ))}
        </div>
      )}
    </div>
  );
}
