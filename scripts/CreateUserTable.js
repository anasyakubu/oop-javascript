const pool = require('../src/config/postgreSQL.config.ts');

async function createTable() {
  const table = await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE
    );
  `);
  console.log('Table created', table);
}

createTable();
