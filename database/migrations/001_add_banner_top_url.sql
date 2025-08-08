-- Migration para adicionar campo banner_top_url à tabela Filmes
-- Execute este script no banco de dados para atualizar a estrutura existente

ALTER TABLE "Filmes" 
ADD COLUMN banner_top_url VARCHAR(255);

-- Opcional: adicionar comentário para documentar o campo
COMMENT ON COLUMN "Filmes".banner_top_url IS 'URL da imagem horizontal do banner/poster do filme';
