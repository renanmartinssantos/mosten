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
    <div className="card mb-8" data-oid="k_i4qzn">
      <h2
        className="text-xl font-bold mb-4 text-primary-600"
        data-oid=".2g:e4-"
      >
        📝 Cadastrar Novo Filme
      </h2>

      <form id="cadastro-filme-form" action={handleSubmit} data-oid="x_xx4tw">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="vbqt64-"
        >
          <div data-oid="7_:5e30">
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="0mtywm_"
            >
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              required
              className="input"
              placeholder="Nome do filme ou série"
              data-oid="tk64yu_"
            />
          </div>

          <div data-oid="n_y6nu7">
            <label
              htmlFor="generoId"
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="z4k3.4_"
            >
              Gênero *
            </label>
            <select
              id="generoId"
              name="generoId"
              required
              className="input"
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

        <div className="mb-4" data-oid="u7lh3as">
          <label
            htmlFor="imagemUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="t5eewbp"
          >
            URL da Imagem *
          </label>
          <input
            type="url"
            id="imagemUrl"
            name="imagemUrl"
            required
            className="input"
            placeholder="https://exemplo.com/imagem.jpg"
            data-oid="1.q1gwi"
          />
        </div>

        <div className="mb-4" data-oid="tngw_7y">
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-1"
            data-oid="372rar8"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            className="input resize-none"
            placeholder="Descrição do filme ou série (opcional)"
            data-oid="o5bkcvk"
          />
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes("sucesso")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            data-oid="s--1g3i"
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          data-oid="rxebrn3"
        >
          {isLoading ? "Cadastrando..." : "Cadastrar Filme"}
        </button>
      </form>
    </div>
  );
}
