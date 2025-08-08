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
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-oid="q:rfesj"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
        data-oid="e76xs-f"
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl p-6 text-white relative overflow-hidden"
          data-oid="vgxx448"
        >
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 transform translate-x-16 -translate-y-16"
            data-oid="8w57-48"
          ></div>
          <div className="relative z-10" data-oid="mmjoy:h">
            <div
              className="flex items-center justify-between"
              data-oid="-gosq7y"
            >
              <div data-oid="9nkjoxt">
                <h2 className="text-2xl font-bold mb-1" data-oid="awrz-6y">
                  {isLogin ? "Bem-vindo de volta!" : "Criar sua conta"}
                </h2>
                <p className="text-gray-300 text-sm" data-oid="d7tsm5j">
                  {isLogin
                    ? "Entre para votar nos seus filmes favoritos"
                    : "Junte-se à nossa comunidade"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors p-1"
                data-oid="iulb25_"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="ztzyf4z"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    data-oid="s-mvpkg"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6" data-oid="_vc68xi">
          <form action={handleSubmit} className="space-y-4" data-oid="wr8rqd2">
            {!isLogin && (
              <div data-oid="5jboqmo">
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  data-oid="kac0t2l"
                >
                  👤 Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="Digite seu nome completo"
                  data-oid="t8nx42k"
                />
              </div>
            )}

            <div data-oid=":hl_x_f">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
                data-oid="3qejqw3"
              >
                📧 Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
                data-oid="jokh4h3"
              />
            </div>

            <div data-oid="codkbhr">
              <label
                htmlFor="senha"
                className="block text-sm font-semibold text-gray-700 mb-2"
                data-oid="a5e.k-n"
              >
                🔒 Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="Digite sua senha"
                minLength={6}
                data-oid="2-a5smp"
              />
            </div>

            {!isLogin && (
              <div data-oid="4.0m-0:">
                <label
                  htmlFor="confirmarSenha"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  data-oid="v4eb2j7"
                >
                  🔒 Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="Confirme sua senha"
                  minLength={6}
                  data-oid="jk1fbgl"
                />
              </div>
            )}

            {message && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${
                  message.includes("sucesso")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
                data-oid="crabsv_"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-oid="wk91s60"
            >
              {isLoading ? (
                <div
                  className="flex items-center justify-center space-x-2"
                  data-oid="toex9on"
                >
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    data-oid="su2141e"
                  ></div>
                  <span data-oid="0j2if4b">Aguarde...</span>
                </div>
              ) : (
                <span data-oid="wjafola">
                  {isLogin ? "🎬 Entrar" : "🚀 Criar Conta"}
                </span>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center" data-oid="j:fwb3j">
            <div className="relative" data-oid="4v4qrya">
              <div
                className="absolute inset-0 flex items-center"
                data-oid="75x_vp3"
              >
                <div
                  className="w-full border-t border-gray-300"
                  data-oid="0wt22ux"
                ></div>
              </div>
              <div
                className="relative flex justify-center text-sm"
                data-oid="jpvloez"
              >
                <span
                  className="px-2 bg-white text-gray-500"
                  data-oid="drbew2l"
                >
                  ou
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="mt-4 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              data-oid="05e:bbp"
            >
              {isLogin
                ? "Não tem conta? Criar uma nova conta"
                : "Já tem conta? Fazer login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
