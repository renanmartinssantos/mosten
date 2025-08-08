export type Genero = {
  id: number;
  nome: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  dataCadastro: Date;
};

export type Filme = {
  id: number;
  titulo: string;
  descricao: string | null;
  imagemUrl: string;
  bannerTopUrl: string | null;
  dataCadastro: Date;
  generoId: number;
};

export type Voto = {
  id: number;
  tipoVoto: number; // 1 para Gostei, -1 para Não Gostei
  dataVoto: Date;
  filmeId: number;
  usuarioId: number;
};

export type FilmeComVotos = {
  id: number;
  titulo: string;
  descricao: string | null;
  imagemUrl: string;
  bannerTopUrl: string | null;
  genero: string;
  gostei: string;
  naoGostei: string;
};

export type UsuarioLogado = {
  id: number;
  nome: string;
  email: string;
};

export type SessionData = {
  user: UsuarioLogado;
  isLoggedIn: boolean;
};

export type NovoFilme = {
  titulo: string;
  descricao?: string;
  imagemUrl: string;
  bannerTopUrl?: string;
  generoId: number;
};

export type NovoUsuario = {
  nome: string;
  email: string;
  senha: string;
};

export type LoginData = {
  email: string;
  senha: string;
};
