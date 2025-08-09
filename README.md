# 🎬 Mosten Films - Sistema de Votação de Filmes

Um sistema completo de votação para filmes desenvolvido com Next.js 14, TypeScript e PostgreSQL, apresentando uma interface moderna e funcionalidades avançadas de votação e administração.

## 🚀 Características Principais

### Autenticação e Segurança
- ✅ **Sistema de autenticação completo** com registro e login de usuários
- ✅ **Segurança ** com JWT, bcrypt para hash de senhas e cookies httpOnly
- ✅ **Sessões persistentes** com middleware de autenticação
- ✅ **Validação de dados** no frontend e backend

### Sistema de Votação Inteligente
- ✅ **Votação interativa** (👍 Gostei / 👎 Não Gostei)
- ✅ **Controle de votos** - um voto por usuário por filme com possibilidade de alteração
- ✅ **Estatísticas em tempo real** com contadores dinâmicos

### Modo Administrador
- ✅ **Painel administrativo** com toggle de ativação no header
- ✅ **Cadastro completo de filmes** com título, gênero, imagens e descrição
- ✅ **Upload de imagens** via URL com suporte a banners horizontais
- ✅ **Gerenciamento de gêneros** pré-cadastrados
- ✅ **Restrição de acesso** - apenas usuários logados podem ativar modo admin

### Interface e Experiência do Usuário
- ✅ **Design moderno e responsivo** com Tailwind CSS e gradientes
- ✅ **Animações fluidas** e estados de carregamento
- ✅ **Cards de filmes modernos** com overlays, badges e informações detalhadas
- ✅ **Modal de autenticação** com loading states e feedback visual
- ✅ **Dashboard de estatísticas** com métricas de votação
- ✅ **Carousel de destaques** com filmes mais votados

### Tecnologias e Arquitetura
- ✅ **Next.js 14** com App Router e Server Actions
- ✅ **TypeScript** para tipagem estática e maior segurança
- ✅ **PostgreSQL** com queries diretas usando postgres.js
- ✅ **Middleware personalizado** para controle de sessões
- ✅ **Context API** para gerenciamento de estado global
- ✅ **SwiperJS** para interface de votação tipo Tinder

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router, Server Actions, Middleware)
- **Linguagem**: TypeScript para tipagem estática
- **Estilização**: Tailwind CSS com componentes customizados
- **Banco de Dados**: PostgreSQL com postgres.js
- **Autenticação**: JWT com jose e cookies httpOnly
- **Hash de senhas**: bcrypt para segurança
- **UI Components**: SwiperJS para interface de swipe
- **Ícones**: Lucide React e Heroicons

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL (local ou remoto)
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd mosten
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_HOST=seu_host_aqui
DATABASE_NAME=seu_database_aqui
DATABASE_USER=seu_usuario_aqui
DATABASE_PASSWORD=sua_senha_aqui
JWT_SECRET=gere_um_secret_seguro_e_longo_aqui
```

### 4. Configure o banco de dados
Execute o script SQL localizado em `database/schema.sql` no seu PostgreSQL:

```bash
psql -h seu_host -U seu_usuario -d seu_database -f database/schema.sql
```

### 5. Execute o projeto
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📖 Como usar

### Para usuários:
1. **Registre-se** ou faça **login** clicando no botão "Entrar"
2. **Vote** nos filmes usando os botões 👍 (Gostei) ou 👎 (Não Gostei)
3. Veja os resultados atualizados em tempo real

### Para administradores:
1. Faça login normalmente
2. **Ative o "Admin Mode"** usando o interruptor no cabeçalho
3. **Cadastre novos filmes** usando o formulário que aparecerá
4. Preencha: título, gênero, URL da imagem e descrição (opcional)

## 📖 Funcionalidades Detalhadas

### Sistema de Autenticação
- **Registro de usuários** com validação de email único
- **Login seguro** com verificação de credenciais
- **Sessões persistentes** usando JWT e cookies seguros
- **Logout** com limpeza de sessão
- **Middleware de proteção** para rotas sensíveis

### Interface de Votação
- **Modo Grid**: Cards modernos com informações completas dos filmes
- **Restrição de acesso**: Apenas usuários logados podem votar
- **Alteração de votos**: Possibilidade de mudar opinião sobre filmes

### Painel Administrativo
- **Toggle Admin**: Ativação do modo admin no header (apenas para usuários logados)
- **Cadastro de filmes**: Formulário completo com validações
- **Upload de imagens**: Suporte a poster vertical e banner horizontal
- **Gerenciamento**: Criação e edição de conteúdo
- **Segurança**: Acesso restrito e validado

### Dashboard e Estatísticas
- **Carousel de destaques**: Filmes mais votados em rotação automática
- **Métricas em tempo real**: Contadores de votos atualizados instantaneamente
- **Barras de progresso**: Visualização da proporção de votos positivos/negativos
- **Estatísticas globais**: Total de filmes, likes e dislikes

### Experiência do Usuário
- **Design responsivo**: Interface adaptada para desktop e mobile
- **Estados de carregamento**: Skeletons e spinners durante operações
- **Feedback visual**: Confirmações e alertas para ações do usuário
- **Navegação intuitiva**: UX otimizada para facilidade de uso

## 🗃️ Arquitetura do Banco de Dados

### Esquema Relacional:

**Generos**
- `id`: Chave primária, auto-incremento
- `nome`: Nome do gênero (varchar único)

**Usuarios**
- `id`: Chave primária, auto-incremento
- `nome`: Nome completo do usuário
- `email`: Email único para login
- `senha_hash`: Senha criptografada com bcrypt
- `data_cadastro`: Timestamp de criação

**Filmes**
- `id`: Chave primária, auto-incremento
- `titulo`: Título do filme
- `descricao`: Descrição opcional (text)
- `imagem_url`: URL do poster do filme
- `banner_top_url`: URL do banner horizontal (opcional)
- `genero_id`: Chave estrangeira para Generos
- `data_cadastro`: Timestamp de criação

**Votos**
- `id`: Chave primária, auto-incremento
- `tipo_voto`: 1 (Gostei) ou -1 (Não Gostei)
- `filme_id`: Chave estrangeira para Filmes
- `usuario_id`: Chave estrangeira para Usuarios
- `data_voto`: Timestamp do voto
- **Constraint UNIQUE**: (filme_id, usuario_id) - previne votos duplicados

### Relacionamentos:
- **Filmes ↔ Generos**: Muitos para Um (filme tem um gênero)
- **Votos ↔ Filmes**: Muitos para Um (voto pertence a um filme)
- **Votos ↔ Usuarios**: Muitos para Um (voto pertence a um usuário)
- **Votos**: Constraint única por usuário/filme para integridade dos dados

## 🔒 Segurança e Boas Práticas

### Autenticação e Autorização
- **Senhas hasheadas** com bcrypt (salt rounds otimizado)
- **JWT tokens** seguros com chave secreta robusta
- **Cookies httpOnly** para prevenir ataques XSS
- **Middleware de autenticação** para proteger rotas sensíveis
- **Validação de sessão** em cada requisição protegida

### Arquitetura Segura
- **Separation of Concerns**: Camadas bem definidas (auth, data, UI)
- **Environment Variables**: Configurações sensíveis isoladas
- **Server Actions**: Comunicação segura entre cliente e servidor
- **Context API**: Gerenciamento seguro de estado global

## 📁 Estrutura e Organização do Projeto

```
mosten/
├── app/                      # Next.js 14 App Router
│   ├── actions.ts           # Server Actions (handleLogin, handleVote, etc.)
│   ├── globals.css          # Estilos globais e utilitários Tailwind
│   ├── layout.tsx           # Layout raiz com providers
│   ├── middleware.ts        # Middleware de autenticação
│   ├── page.tsx            # Página inicial com componentes principais
│   └── api/                # API Routes
│       ├── filmes/         # Endpoints para filmes
│       ├── session/        # Gerenciamento de sessão
│       └── generos/        # Endpoints para gêneros
├── components/             # Componentes React reutilizáveis
│   ├── Header.tsx          # Cabeçalho com autenticação e admin toggle
│   ├── AuthModal.tsx       # Modal de login/registro com loading states
│   ├── AdminSwitch.tsx     # Interruptor do modo administrador
│   ├── CadastroFilme.tsx   # Formulário de cadastro de filmes
│   ├── MovieGrid.tsx       # Grid de filmes com votação
│   ├── FilmesContainer.tsx # Container com alternância de visualizações
│   ├── HeroCarousel.tsx    # Carousel de filmes em destaque
│   ├── StatsPanel.tsx      # Painel de estatísticas
│   └── ListView.tsx        # Visualização em lista
├── contexts/               # Context API para estado global
│   └── UserContext.tsx     # Contexto de usuário e autenticação
├── lib/                    # Utilitários e configurações
│   ├── auth.ts            # Funções de autenticação JWT
│   ├── data.ts            # Acesso aos dados e queries SQL
│   ├── db.ts              # Configuração e conexão PostgreSQL
│   └── definitions.ts      # Tipos TypeScript e interfaces
├── database/              # Scripts de banco de dados
│   ├── schema.sql         # Schema principal do banco
│   └── migrations/        # Migrações (bannerTopUrl, etc.)
├── public/               # Arquivos estáticos
└── ...                   # Configurações (next.config.mjs, etc.)
```

### Destaques da Arquitetura:
- **Server Actions**: Comunicação segura entre cliente e servidor
- **Middleware personalizado**: Interceptação e validação de requisições
- **Context API**: Estado global reativo para autenticação
- **Componentes modulares**: Reutilização e manutenibilidade
- **Tipagem completa**: TypeScript em toda a aplicação

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL (local ou remoto)
- npm ou yarn

### Setup do Projeto

**1. Clone e instale dependências**
```bash
git clone <repositorio>
cd mosten
npm install
```

**2. Configuração do banco**
```env
# .env.local
DATABASE_HOST=seu_host
DATABASE_NAME=mosten_db
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
JWT_SECRET=chave_secreta_longa_e_segura
```

**4. Execução**
```bash
npm run dev
# Acesse: http://localhost:3000
```
```

**Variáveis de ambiente necessárias:**
- `DATABASE_HOST`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`
- `JWT_SECRET` (string longa e aleatória)

---

Desenvolvido com Next.js 14, TypeScript e PostgreSQL
