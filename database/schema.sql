-- Script SQL para criar as tabelas do sistema de votação de filmes

-- Criação da tabela Generos
CREATE TABLE IF NOT EXISTS "Generos" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Criação da tabela Usuarios
CREATE TABLE IF NOT EXISTS "Usuarios" (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criação da tabela Filmes
CREATE TABLE IF NOT EXISTS "Filmes" (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(255) NOT NULL,
    banner_top_url VARCHAR(255),
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT now(),
    genero_id INTEGER NOT NULL,
    FOREIGN KEY (genero_id) REFERENCES "Generos"(id) ON DELETE RESTRICT
);

-- Criação da tabela Votos
CREATE TABLE IF NOT EXISTS "Votos" (
    id BIGSERIAL PRIMARY KEY,
    tipo_voto SMALLINT NOT NULL CHECK (tipo_voto IN (1, -1)), -- 1 para Gostei, -1 para Não Gostei
    data_voto TIMESTAMP WITH TIME ZONE DEFAULT now(),
    filme_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES "Filmes"(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES "Usuarios"(id) ON DELETE CASCADE,
    UNIQUE (filme_id, usuario_id) -- Garante que um usuário vote apenas uma vez por filme
);

-- Inserção de gêneros padrão
INSERT INTO "Generos" (nome) VALUES
    ('Ação'),
    ('Aventura'),
    ('Comédia'),
    ('Drama'),
    ('Ficção Científica'),
    ('Terror'),
    ('Romance'),
    ('Suspense'),
    ('Animação'),
    ('Documentário'),
    ('Fantasia'),
    ('Crime'),
    ('Guerra'),
    ('Western'),
    ('Musical')
ON CONFLICT (nome) DO NOTHING;

-- Inserção de alguns filmes de exemplo (opcional)
INSERT INTO "Filmes" (titulo, descricao, imagem_url, genero_id) VALUES
    (
        'Matrix',
        'Um programador descobre que a realidade é uma simulação e se junta a uma rebelião contra as máquinas.',
        'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        (SELECT id FROM "Generos" WHERE nome = 'Ficção Científica')
    ),
    (
        'O Poderoso Chefão',
        'A saga de uma família mafiosa italiana-americana e sua luta pelo poder.',
        'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        (SELECT id FROM "Generos" WHERE nome = 'Drama')
    ),
    (
        'Vingadores: Ultimato',
        'Os heróis restantes se unem para desfazer as ações de Thanos e restaurar o universo.',
        'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        (SELECT id FROM "Generos" WHERE nome = 'Ação')
    ),
    (
        'Parasita',
        'Uma família pobre infiltra-se na vida de uma família rica com consequências inesperadas.',
        'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        (SELECT id FROM "Generos" WHERE nome = 'Drama')
    )
ON CONFLICT DO NOTHING;

-- Criação de índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_filmes_genero_id ON "Filmes"(genero_id);
CREATE INDEX IF NOT EXISTS idx_votos_filme_id ON "Votos"(filme_id);
CREATE INDEX IF NOT EXISTS idx_votos_usuario_id ON "Votos"(usuario_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON "Usuarios"(email);
