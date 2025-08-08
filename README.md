# 🎬 Mosten - Sistema de Votação de Filmes

Um sistema completo de votação para filmes e séries desenvolvido com Next.js 14, TypeScript e PostgreSQL.

## 🚀 Características

- ✅ **Autenticação de usuários** (registro e login)
- ✅ **Sistema de votação** (👍 Gostei / 👎 Não Gostei)
- ✅ **Modo administrador** com interruptor para cadastro de filmes
- ✅ **Interface moderna** com Tailwind CSS
- ✅ **Segurança** com JWT e senhas hasheadas
- ✅ **Responsivo** para desktop e mobile
- ✅ **Persistência de dados** em PostgreSQL

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: PostgreSQL
- **ORM**: postgres.js (conexão direta)
- **Autenticação**: JWT com jose
- **Hash de senhas**: bcrypt

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

## 🎨 Funcionalidades

### Autenticação
- Registro de novos usuários
- Login seguro com verificação de senha
- Sessões persistentes com JWT
- Logout seguro

### Votação
- Apenas usuários logados podem votar
- Um voto por usuário por filme
- Possibilidade de alterar o voto
- Contadores em tempo real

### Administração
- Interruptor de modo admin no cabeçalho
- Cadastro de novos filmes
- Seleção de gêneros pré-cadastrados
- Upload de imagens via URL

### Interface
- Design moderno e responsivo
- Animações e estados de carregamento
- Feedback visual para ações
- Cards informativos para cada filme

## 🗃️ Estrutura do Banco de Dados

### Tabelas:

**Generos**
- `id`: Identificador único
- `nome`: Nome do gênero

**Usuarios**
- `id`: Identificador único
- `nome`: Nome completo
- `email`: Email único
- `senha_hash`: Senha hasheada
- `data_cadastro`: Data de criação

**Filmes**
- `id`: Identificador único
- `titulo`: Título do filme
- `descricao`: Descrição (opcional)
- `imagem_url`: URL da imagem
- `genero_id`: Referência ao gênero
- `data_cadastro`: Data de criação

**Votos**
- `id`: Identificador único
- `tipo_voto`: 1 (Gostei) ou -1 (Não Gostei)
- `filme_id`: Referência ao filme
- `usuario_id`: Referência ao usuário
- `data_voto`: Data do voto
- **Constraint**: Único por (filme_id, usuario_id)

## 🔒 Segurança

- **Senhas hasheadas** com bcrypt
- **JWT tokens** seguros e encriptados
- **SQL parametrizado** para prevenir SQL Injection
- **Cookies httpOnly** para sessões
- **Validação de dados** no frontend e backend

## 📁 Estrutura do Projeto

```
mosten/
├── app/                    # Next.js App Router
│   ├── actions.ts         # Server Actions
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página inicial
│   └── api/              # Rotas da API
├── components/           # Componentes React
│   ├── Header.tsx        # Cabeçalho com auth
│   ├── AdminSwitch.tsx   # Interruptor admin
│   ├── AuthModal.tsx     # Modal de login/registro
│   ├── CadastroFilme.tsx # Formulário de filmes
│   └── ListaFilmes.tsx   # Lista de filmes
├── lib/                  # Utilitários
│   ├── auth.ts          # Funções de autenticação
│   ├── data.ts          # Acesso aos dados
│   ├── db.ts            # Conexão com o banco
│   └── definitions.ts    # Tipos TypeScript
├── database/
│   └── schema.sql       # Script de criação do banco
└── ...configurações
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Faça push para um repositório Git
2. Conecte com Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outras plataformas
1. Build da aplicação: `npm run build`
2. Configure as variáveis de ambiente
3. Execute: `npm start`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap

- [ ] Sistema de categorias personalizadas
- [ ] Comentários em filmes
- [ ] Sistema de favoritos
- [ ] Dashboard administrativo
- [ ] API externa para busca de filmes
- [ ] Sistema de notificações
- [ ] Ranking de usuários mais ativos

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato.

---

Desenvolvido com ❤️ usando Next.js e TypeScript
