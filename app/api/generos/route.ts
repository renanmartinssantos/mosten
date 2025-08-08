import { NextRequest, NextResponse } from 'next/server';
import { getGeneros } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const generos = await getGeneros();
    return NextResponse.json(generos);
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar gêneros' },
      { status: 500 }
    );
  }
}
