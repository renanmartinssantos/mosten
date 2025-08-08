import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SessionData, UsuarioLogado } from './definitions';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionData;
  } catch (error) {
    return null;
  }
}

export async function login(user: UsuarioLogado) {
  const sessionData: SessionData = {
    user,
    isLoggedIn: true,
  };

  const session = await encrypt(sessionData);
  
  cookies().set('session', session, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function logout() {
  // Limpar o cookie de sessão de forma mais robusta
  const cookieStore = cookies();
  
  // Definir o cookie como expirado
  cookieStore.set('session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  
  // Remover o cookie também
  cookieStore.delete('session');
}

export async function getSession(): Promise<SessionData | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  if (!parsed) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  
  return res;
}
