"use client";

import { useState } from "react";

export default function SimpleLoadingTest() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    console.log("🔄 ANTES - isLoading:", isLoading);
    setIsLoading(true);
    console.log("🔄 DEPOIS setIsLoading(true) - isLoading:", isLoading);
    
    // Simula uma operação
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("🔚 setIsLoading(false)");
    setIsLoading(false);
  };

  console.log("🔍 Render - isLoading:", isLoading);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl mb-4">Teste de Loading</h3>
        
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg font-medium ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Carregando...
            </div>
          ) : (
            "Testar Loading"
          )}
        </button>
        
        <div className="mt-4 text-sm">
          Estado: <span className={isLoading ? 'text-red-600' : 'text-green-600'}>
            {isLoading ? "CARREGANDO" : "NORMAL"}
          </span>
        </div>
      </div>
    </div>
  );
}
