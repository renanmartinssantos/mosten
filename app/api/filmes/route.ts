import { NextRequest, NextResponse } from 'next/server';
import { getFilmesComVotos } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const filmes = await getFilmesComVotos();
    return NextResponse.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar filmes' },
      { status: 500 }
    );
  }
}
