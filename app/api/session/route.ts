import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    const response = session && session.isLoggedIn
      ? NextResponse.json({
          isLoggedIn: true,
          user: session.user,
        })
      : NextResponse.json({ isLoggedIn: false });

    // Adicionar headers para evitar cache
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    const errorResponse = NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
    
    // Adicionar headers para evitar cache também em caso de erro
    errorResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return errorResponse;
  }
}
