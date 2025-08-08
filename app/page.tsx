import CadastroFilme from "@/components/CadastroFilme";
import HeroCarousel from "@/components/HeroCarousel";
import StatsPanel from "@/components/StatsPanel";
import MovieGrid from "@/components/MovieGrid";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50" data-oid="acg_vrc">
      {/* Hero Carousel */}
      <HeroCarousel data-oid="w6vbc1x" />

      {/* Stats Panel */}
      <StatsPanel data-oid="bc9xxx7" />

      {/* Admin Section - Only show when in admin mode */}
      <div className="container mx-auto px-4 py-8" data-oid="425:6r_">
        <CadastroFilme data-oid="v:u505l" />
      </div>

      {/* Movie Grid */}
      <MovieGrid data-oid="y4qbuos" />
    </div>
  );
}
