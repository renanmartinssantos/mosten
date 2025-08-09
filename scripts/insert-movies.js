#!/usr/bin/env node

const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres({
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: 'require'
});

const filmes = [
  {
    titulo: 'Matrix',
    genero: 'Ficção Científica',
    ano: 1999,
    diretor: 'Lana Wachowski, Lilly Wachowski',
    imagem_url: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    banner_top_url: 'https://image.tmdb.org/t/p/w1280/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  },
  {
    titulo: 'À Procura da Felicidade',
    genero: 'Drama',
    ano: 2006,
    diretor: 'Gabriele Muccino',
    imagem_url: 'https://image.tmdb.org/t/p/w500/zeUXVbeXVdz3YcQlSjDMfKVBPrS.jpg',
    banner_top_url: 'https://image.tmdb.org/t/p/w1280/zeUXVbeXVdz3YcQlSjDMfKVBPrS.jpg'
  },
  {
    titulo: 'Hachiko',
    genero: 'Drama',
    ano: 2009,
    diretor: 'Lasse Hallström',
    imagem_url: 'https://image.tmdb.org/t/p/w500/4XAGI16PVGE4wCFnKRbdKz5C2Qc.jpg',
    banner_top_url: 'https://image.tmdb.org/t/p/w1280/4XAGI16PVGE4wCFnKRbdKz5C2Qc.jpg'
  }
];

async function insertFilmes() {
  try {
    console.log('🎬 Inserindo filmes no banco de dados...');
    
    for (const filme of filmes) {
      // Verificar se o filme já existe
      const existingFilme = await sql`
        SELECT id FROM "Filmes" WHERE titulo = ${filme.titulo}
      `;
      
      if (existingFilme.length > 0) {
        console.log(`⚠️  Filme "${filme.titulo}" já existe no banco de dados`);
        continue;
      }
      
      // Buscar o ID do gênero
      const generoResult = await sql`
        SELECT id FROM "Generos" WHERE nome = ${filme.genero}
      `;
      
      if (generoResult.length === 0) {
        console.log(`❌ Gênero "${filme.genero}" não encontrado`);
        continue;
      }
      
      const generoId = generoResult[0].id;
      
      // Inserir filme
      const result = await sql`
        INSERT INTO "Filmes" (titulo, imagem_url, banner_top_url, genero_id)
        VALUES (${filme.titulo}, ${filme.imagem_url}, ${filme.banner_top_url}, ${generoId})
        RETURNING id, titulo
      `;
      
      console.log(`✅ Filme "${result[0].titulo}" inserido com ID: ${result[0].id}`);
    }
    
    // Mostrar todos os filmes
    const allFilmes = await sql`
      SELECT f.id, f.titulo, g.nome as genero, f.imagem_url 
      FROM "Filmes" f 
      JOIN "Generos" g ON f.genero_id = g.id 
      ORDER BY f.id
    `;
    
    console.log('\n📋 Filmes cadastrados no banco:');
    allFilmes.forEach(filme => {
      console.log(`  ${filme.id}. ${filme.titulo} - ${filme.genero}`);
    });
    
    console.log('\n🎉 Script executado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inserir filmes:', error);
  } finally {
    await sql.end();
  }
}

insertFilmes();
