import postgres from 'postgres';

const sql = postgres({
  host: process.env.DATABASE_HOST!,
  database: process.env.DATABASE_NAME!,
  username: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  ssl: 'require',
  // Removido transform para evitar conflitos com nomes de tabelas
});

export default sql;
