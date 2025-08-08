'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { 
  criarFilme, 
  criarUsuario, 
  buscarUsuarioPorEmail, 
  emailJaExiste, 
  verificarSenha, 
  registrarVoto 
} from '@/lib/data';
import { login, logout, getSession } from '@/lib/auth';
import { NovoFilme, NovoUsuario, LoginData } from '@/lib/definitions';

// Ação para votar em um filme
export async function handleVote(filmeId: number, tipoVoto: number) {
  try {
    const session = await getSession();
    
    if (!session?.isLoggedIn || !session.user) {
      throw new Error('Usuário não autenticado');
    }

    await registrarVoto(filmeId, session.user.id, tipoVoto);
    revalidatePath('/');
    
    return { success: true, message: 'Voto registrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao votar:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro ao registrar voto' 
    };
  }
}

// Ação para cadastrar um novo filme
export async function handleCadastrarFilme(formData: FormData) {
  try {
    const session = await getSession();
    
    if (!session?.isLoggedIn) {
      throw new Error('Usuário não autenticado');
    }

    const titulo = formData.get('titulo') as string;
    const descricao = formData.get('descricao') as string;
    const imagemUrl = formData.get('imagemUrl') as string;
    const generoId = parseInt(formData.get('generoId') as string);

    if (!titulo || !imagemUrl || !generoId) {
      throw new Error('Dados obrigatórios não fornecidos');
    }

    const novoFilme: NovoFilme = {
      titulo,
      descricao: descricao || undefined,
      imagemUrl,
      generoId,
    };

    await criarFilme(novoFilme);
    revalidatePath('/');
    
    return { success: true, message: 'Filme cadastrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao cadastrar filme:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro ao cadastrar filme' 
    };
  }
}

// Ação para registro de usuário
export async function handleRegistro(formData: FormData) {
  try {
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;
    const confirmarSenha = formData.get('confirmarSenha') as string;

    if (!nome || !email || !senha || !confirmarSenha) {
      return { success: false, message: 'Todos os campos são obrigatórios' };
    }

    if (senha !== confirmarSenha) {
      return { success: false, message: 'As senhas não coincidem' };
    }

    if (senha.length < 6) {
      return { success: false, message: 'A senha deve ter pelo menos 6 caracteres' };
    }

    // Verificar se o email já existe
    const emailExiste = await emailJaExiste(email);
    if (emailExiste) {
      return { success: false, message: 'Este email já está cadastrado' };
    }

    const novoUsuario: NovoUsuario = { nome, email, senha };
    const usuario = await criarUsuario(novoUsuario);

    // Fazer login automaticamente após o registro
    await login({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });

    return { success: true, message: 'Usuário registrado com sucesso!' };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro ao registrar usuário' 
    };
  }
}

// Ação para login
export async function handleLogin(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;

    if (!email || !senha) {
      return { success: false, message: 'Email e senha são obrigatórios' };
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return { success: false, message: 'Email ou senha incorretos' };
    }

    const senhaValida = await verificarSenha(senha, usuario.senhaHash);
    if (!senhaValida) {
      return { success: false, message: 'Email ou senha incorretos' };
    }

    await login({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });

    return { success: true, message: 'Login realizado com sucesso!' };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro ao fazer login' 
    };
  }
}

// Ação para logout
export async function handleLogout() {
  try {
    await logout();
    redirect('/');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}

// Ação para logout sem redirect (para uso no cliente)
export async function handleLogoutClient() {
  try {
    await logout();
    // Revalidar todas as páginas para limpar cache
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, message: 'Erro ao fazer logout' };
  }
}
