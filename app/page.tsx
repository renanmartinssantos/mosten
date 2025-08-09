import CadastroFilme from "@/components/CadastroFilme";
import HeroCarousel from "@/components/HeroCarousel";
import StatsPanel from "@/components/StatsPanel";
import MovieGrid from "@/components/MovieGrid";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Panel */}
      <StatsPanel />

      {/* Admin Section - Only show when in admin mode */}
      <div className="container mx-auto px-4 py-8">
        <CadastroFilme />
      </div>

      {/* Movie Grid */}
      <MovieGrid />
    </div>
  );
}
