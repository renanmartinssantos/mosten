"use client";

import { useState, useEffect } from "react";
import { handleCadastrarFilme } from "@/app/actions";
import { useAdmin } from "./AdminSwitch";

type Genero = {
  id: number;
  nome: string;
};

export default function CadastroFilme() {
  const { isAdminMode } = useAdmin();
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAdminMode) {
      fetchGeneros();
    }
  }, [isAdminMode]);

  const fetchGeneros = async () => {
    try {
      const response = await fetch("/api/generos");
      if (response.ok) {
        const data = await response.json();
        setGeneros(data);
      }
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await handleCadastrarFilme(formData);
      setMessage(result.message);

      if (result.success) {
        // Limpar o formulário
        const form = document.getElementById(
          "cadastro-filme-form",
        ) as HTMLFormElement;
        form?.reset();
      }
    } catch (error) {
      setMessage("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdminMode) {
    return null;
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
      data-oid="k_i4qzn"
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 relative overflow-hidden"
        data-oid="lhamg.k"
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 transform translate-x-16 -translate-y-16"
          data-oid="iz5y6mo"
        ></div>
        <div className="relative z-10" data-oid="iygia-x">
          <h2 className="text-2xl font-bold text-white mb-2" data-oid=".2g:e4-">
            🎬 Cadastrar Novo Filme
          </h2>
          <p className="text-gray-300 text-sm" data-oid="gtx90xo">
            Adicione um novo filme ou série para a votação da comunidade
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-8" data-oid=".sy.f-a">
        <form
          id="cadastro-filme-form"
          action={handleSubmit}
          className="space-y-6"
          data-oid="x_xx4tw"
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            data-oid="vbqt64-"
          >
            <div data-oid="7_:5e30">
              <label
                htmlFor="titulo"
                className="block text-sm font-semibold text-gray-700 mb-2"
                data-oid="0mtywm_"
              >
                🎭 Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="Ex: Vingadores: Ultimato"
                data-oid="tk64yu_"
              />
            </div>

            <div data-oid="n_y6nu7">
              <label
                htmlFor="generoId"
                className="block text-sm font-semibold text-gray-700 mb-2"
                data-oid="z4k3.4_"
              >
                🎪 Gênero *
              </label>
              <select
                id="generoId"
                name="generoId"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white"
                data-oid="rayxt0e"
              >
                <option value="" data-oid="zhfjq-d">
                  Selecione um gênero
                </option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id} data-oid="yfati6g">
                    {genero.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div data-oid="u7lh3as">
            <label
              htmlFor="imagemUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
              data-oid="t5eewbp"
            >
              🖼️ URL da Imagem do Poster *
            </label>
            <input
              type="url"
              id="imagemUrl"
              name="imagemUrl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="https://exemplo.com/poster-do-filme.jpg"
              data-oid="1.q1gwi"
            />

            <p className="text-xs text-gray-500 mt-1" data-oid="dsn3z4x">
              💡 Dica: Use URLs de alta qualidade para melhor visualização
            </p>
          </div>

          <div data-oid="banner-top-field">
            <label
              htmlFor="bannerTopUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
              data-oid="banner-top-label"
            >
              🎬 URL do Banner Horizontal (Opcional)
            </label>
            <input
              type="url"
              id="bannerTopUrl"
              name="bannerTopUrl"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="https://exemplo.com/banner-horizontal-do-filme.jpg"
              data-oid="banner-top-input"
            />

            <p className="text-xs text-gray-500 mt-1" data-oid="banner-top-tip">
              💡 Banner em formato horizontal/landscape para destaque especial
            </p>
          </div>

          <div data-oid="tngw_7y">
            <label
              htmlFor="descricao"
              className="block text-sm font-semibold text-gray-700 mb-2"
              data-oid="372rar8"
            >
              📝 Descrição (Opcional)
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
              placeholder="Conte um pouco sobre o enredo, elenco ou curiosidades do filme..."
              data-oid="o5bkcvk"
            />
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium border ${
                message.includes("sucesso")
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
              data-oid="s--1g3i"
            >
              <div className="flex items-center space-x-2" data-oid="cm2qru4">
                <span data-oid="mlo:82.">
                  {message.includes("sucesso") ? "✅" : "❌"}
                </span>
                <span data-oid="f-.vjp7">{message}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4" data-oid="b_hy8pd">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              data-oid="rxebrn3"
            >
              {isLoading ? (
                <>
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    data-oid="n4fc16s"
                  ></div>
                  <span data-oid="ukh0hsa">Cadastrando...</span>
                </>
              ) : (
                <>
                  <span data-oid="ldew_-:">🚀</span>
                  <span data-oid="bjmx8wp">Cadastrar Filme</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
