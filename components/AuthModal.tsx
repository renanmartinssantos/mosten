"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin, handleRegistro } from "@/app/actions";

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

type AuthModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = isLogin
        ? await handleLogin(formData)
        : await handleRegistro(formData);

      if (result && result.success) {
        // Sucesso! Fechar modal e notificar o Header
        onSuccess();
        return;
      }

      // Se chegou até aqui, houve algum erro
      if (result && result.message) {
        setMessage(result.message);
      }
    } catch (error) {
      // Verificar se é o redirect do Next.js (comportamento normal)
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        (error as any).digest?.includes("NEXT_REDIRECT")
      ) {
        // Redirect foi executado com sucesso, notificar sucesso
        onSuccess();
        return;
      }

      // Outro tipo de erro
      console.error("Erro no login/registro:", error);
      setMessage("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-oid="q:rfesj"
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        data-oid="e76xs-f"
      >
        <div
          className="flex justify-between items-center mb-4"
          data-oid="x3abu_:"
        >
          <h2 className="text-xl font-bold" data-oid="cey:df9">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            data-oid="iulb25_"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="75tiz-n"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="cpyoem0"
              />
            </svg>
          </button>
        </div>

        <form action={handleSubmit} data-oid="wr8rqd2">
          {!isLogin && (
            <div className="mb-4" data-oid="5jboqmo">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="kac0t2l"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="input"
                placeholder="Seu nome completo"
                data-oid="t8nx42k"
              />
            </div>
          )}

          <div className="mb-4" data-oid=":hl_x_f">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="3qejqw3"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              placeholder="seu@email.com"
              data-oid="jokh4h3"
            />
          </div>

          <div className="mb-4" data-oid="codkbhr">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 mb-1"
              data-oid="a5e.k-n"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              className="input"
              placeholder="Sua senha"
              minLength={6}
              data-oid="2-a5smp"
            />
          </div>

          {!isLogin && (
            <div className="mb-4" data-oid="4.0m-0:">
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-gray-700 mb-1"
                data-oid="v4eb2j7"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                required
                className="input"
                placeholder="Confirme sua senha"
                minLength={6}
                data-oid="jk1fbgl"
              />
            </div>
          )}

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes("sucesso")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
              data-oid="crabsv_"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full mb-4"
            data-oid="wk91s60"
          >
            {isLoading ? "Aguarde..." : isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <div className="text-center" data-oid="md_k7pj">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-primary-600 hover:text-primary-700 text-sm"
            data-oid="05e:bbp"
          >
            {isLogin ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
