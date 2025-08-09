import { NextRequest, NextResponse } from 'next/server';
import { getFilmesComVotos } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const filmes = await getFilmesComVotos();
    
    // Desabilitar cache para garantir dados atualizados
    const response = NextResponse.json(filmes);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar filmes' },
      { status: 500 }
    );
  }
}
