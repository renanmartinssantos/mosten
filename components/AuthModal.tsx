"use client";

import { useState, useTransition, useCallback } from "react";
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
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();

  // Combina ambos os estados de loading
  const isLoading = isPending || localLoading;

  // Debug - força o re-render quando isPending muda
  console.log("🔍 AuthModal render - isPending:", isPending, "localLoading:", localLoading, "combined:", isLoading);

  const handleSubmit = useCallback(async (formData: FormData) => {
    console.log("🔄 COMEÇOU handleSubmit");
    setMessage("");
    setLocalLoading(true);

    try {
      startTransition(async () => {
        console.log("⏳ DENTRO DA TRANSITION - isPending deve ser true");
        
        try {
          // Delay para ver o loading
          console.log("⏳ DELAY DE 2 SEGUNDOS - LOADING DEVE ESTAR VISÍVEL");
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          console.log("📡 Chamando server action...");
          const result = isLogin
            ? await handleLogin(formData)
            : await handleRegistro(formData);

          console.log("📥 Resultado:", result);

          if (result && result.success) {
            console.log("✅ SUCESSO! Fechando modal...");
            onSuccess();
            return;
          }

          if (result && result.message) {
            setMessage(result.message);
          }
        } catch (error) {
          console.log("❌ ERRO capturado:", error);
          
          if (
            error &&
            typeof error === "object" &&
            "digest" in error &&
            (error as any).digest?.includes("NEXT_REDIRECT")
          ) {
            console.log("🔄 Redirect - SUCESSO!");
            onSuccess();
            return;
          }

          console.error("Erro no login/registro:", error);
          setMessage("Erro interno. Tente novamente.");
        } finally {
          setLocalLoading(false);
        }
      });
    } catch (error) {
      console.error("Erro fora da transition:", error);
      setLocalLoading(false);
    }
  }, [isLogin, onSuccess]);;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={isLoading ? undefined : onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {isLogin ? "Bem-vindo de volta!" : "Criar sua conta"}
                </h2>
                <p className="text-gray-300 text-sm">
                  {isLogin
                    ? "Entre para votar nos seus filmes favoritos"
                    : "Junte-se à nossa comunidade"}
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="text-gray-300 hover:text-white transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form action={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                  placeholder="Digite seu nome completo"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                placeholder="Digite sua senha"
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmarSenha"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                  placeholder="Confirme sua senha"
                  minLength={6}
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
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:from-gray-400 disabled:to-gray-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  {/* SPINNER MAIS AGRESSIVO - MÚLTIPLOS TIPOS */}
                  
                  {/* Spinner 1: Círculo simples */}
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  
                  {/* Spinner 2: Pontos pulsantes */}
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              ) : (
                <span>{isLogin ? "Entrar" : "Criar Conta"}</span>
              )}
            </button>
            
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              disabled={isLoading}
              className="mt-4 text-gray-600 hover:text-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400"
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
