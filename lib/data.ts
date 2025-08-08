import sql from './db';
import { FilmeComVotos, Genero, Usuario, Filme, NovoFilme, NovoUsuario } from './definitions';
import bcrypt from 'bcrypt';

// Data access functions - Updated 2024-08-08 for correct table names with quotes
// Função para buscar Filmes com contagem de votos
export async function getFilmesComVotos(): Promise<FilmeComVotos[]> {
  try {
    console.log('🎬 Buscando filmes com votos...');
    const filmes = await sql<FilmeComVotos[]>`
      SELECT
        f.id, 
        f.titulo, 
        f.descricao, 
        f.imagem_url as "imagemUrl", 
        g.nome AS genero,
        COALESCE(COUNT(v.id) FILTER (WHERE v.tipo_voto = 1), 0) AS gostei,
        COALESCE(COUNT(v.id) FILTER (WHERE v.tipo_voto = -1), 0) AS "naoGostei"
      FROM "Filmes" f
      LEFT JOIN "Generos" g ON f.genero_id = g.id
      LEFT JOIN "Votos" v ON f.id = v.filme_id
      GROUP BY f.id, g.nome 
      ORDER BY f.titulo;
    `;
    console.log('✅ Filmes encontrados:', filmes.length);
    return filmes;
  } catch (error) {
    console.error('Erro ao buscar filmes com Votos:', error);
    throw new Error('Falha ao buscar filmes');
  }
}

// Função para buscar todos os gêneros
export async function getGeneros(): Promise<Genero[]> {
  try {
    console.log('🎭 Buscando gêneros...');
    const generos = await sql<Genero[]>`
      SELECT id, nome 
      FROM "Generos" 
      ORDER BY nome;
    `;
    console.log('✅ Gêneros encontrados:', generos.length);
    return generos;
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw new Error('Falha ao buscar gêneros');
  }
}

// Função para criar um novo filme
export async function criarFilme(filme: NovoFilme): Promise<Filme> {
  try {
    console.log('🎬 Criando novo filme:', filme.titulo);
    const [novoFilme] = await sql<Filme[]>`
      INSERT INTO "Filmes" (titulo, descricao, imagem_url, genero_id)
      VALUES (${filme.titulo}, ${filme.descricao || null}, ${filme.imagemUrl}, ${filme.generoId})
      RETURNING id, titulo, descricao, imagem_url as "imagemUrl", data_cadastro as "dataCadastro", genero_id as "generoId";
    `;
    console.log('✅ Filme criado com ID:', novoFilme.id);
    return novoFilme;
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    throw new Error('Falha ao criar filme');
  }
}

// Função para buscar usuário por email
export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
  try {
    console.log('👤 Buscando usuário por email:', email);
    const [usuario] = await sql<Usuario[]>`
      SELECT id, nome, email, senha_hash as "senhaHash", data_cadastro as "dataCadastro"
      FROM "Usuarios"
      WHERE email = ${email};
    `;
    console.log('✅ Busca de usuário concluída:', usuario ? 'encontrado' : 'não encontrado');
    return usuario || null;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    throw new Error('Falha ao buscar usuário');
  }
}

// Função para criar um novo usuário
export async function criarUsuario(usuario: NovoUsuario): Promise<Usuario> {
  try {
    console.log('👤 Criando novo usuário:', usuario.email);
    const senhaHash = await bcrypt.hash(usuario.senha, 10);
    
    const [novoUsuario] = await sql<Usuario[]>`
      INSERT INTO "Usuarios" (nome, email, senha_hash)
      VALUES (${usuario.nome}, ${usuario.email}, ${senhaHash})
      RETURNING id, nome, email, senha_hash as "senhaHash", data_cadastro as "dataCadastro";
    `;
    console.log('✅ Usuário criado com ID:', novoUsuario.id);
    return novoUsuario;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Falha ao criar usuário');
  }
}

// Função para verificar se o email já existe
export async function emailJaExiste(email: string): Promise<boolean> {
  try {
    console.log('📧 Verificando se email já existe:', email);
    const result = await sql`
      SELECT COUNT(*) as count
      FROM "Usuarios"
      WHERE email = ${email};
    `;
    console.log('✅ Resultado da verificação de email:', result);
    const count = parseInt(result[0].count);
    console.log('✅ Count convertido:', count);
    return count > 0;
  } catch (error) {
    console.error('❌ Erro ao verificar email:', error);
    throw new Error('Falha ao verificar email');
  }
}

// Função para verificar senha
export async function verificarSenha(senha: string, senhaHash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(senha, senhaHash);
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    return false;
  }
}

// Função para registrar ou atualizar voto
export async function registrarVoto(filmeId: number, usuarioId: number, tipoVoto: number): Promise<void> {
  try {
    console.log('🗳️ Registrando voto:', { filmeId, usuarioId, tipoVoto });
    await sql`
      INSERT INTO "Votos" (filme_id, usuario_id, tipo_voto)
      VALUES (${filmeId}, ${usuarioId}, ${tipoVoto})
      ON CONFLICT (filme_id, usuario_id)
      DO UPDATE SET tipo_voto = EXCLUDED.tipo_voto, data_voto = now();
    `;
    console.log('✅ Voto registrado com sucesso');
  } catch (error) {
    console.error('Erro ao registrar voto:', error);
    throw new Error('Falha ao registrar voto');
  }
}

// Função para buscar voto do usuário para um filme específico
export async function buscarVotoUsuario(filmeId: number, usuarioId: number): Promise<number | null> {
  try {
    console.log('🗳️ Buscando voto do usuário:', { filmeId, usuarioId });
    const [voto] = await sql<[{ tipo_voto: number }]>`
      SELECT tipo_voto
      FROM "Votos"
      WHERE filme_id = ${filmeId} AND usuario_id = ${usuarioId};
    `;
    console.log('✅ Busca de voto concluída:', voto?.tipo_voto || 'nenhum voto');
    return voto?.tipo_voto || null;
  } catch (error) {
    console.error('Erro ao buscar voto do usuário:', error);
    return null;
  }
}
