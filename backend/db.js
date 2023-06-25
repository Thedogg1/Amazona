import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  password: 'Bollocks',
  host: 'localhost',
  port: 5432,
  database: 'ecommerceapi',
});

export default pool;
