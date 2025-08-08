import CadastroFilme from "@/components/CadastroFilme";
import ListaFilmes from "@/components/ListaFilmes";

export default function Home() {
  return (
    <div className="space-y-8" data-oid="._xc.0m">
      <div className="text-center" data-oid="59ig239">
        <h1
          className="text-4xl font-bold text-gray-900 mb-2"
          data-oid="w2quhda"
        >
          🎬 Sistema de Votação de Filmes
        </h1>
        <p className="text-lg text-gray-600" data-oid=":2mxsb6">
          Vote nos seus filmes e séries favoritos!
        </p>
      </div>

      <CadastroFilme data-oid="t1ar8pc" />

      <div data-oid="0s4saa9">
        <h2
          className="text-2xl font-bold text-gray-900 mb-6"
          data-oid="_2c8ic:"
        >
          📽️ Filmes e Séries
        </h2>
        <ListaFilmes data-oid="_s66jwz" />
      </div>
    </div>
  );
}
