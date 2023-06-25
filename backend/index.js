import express from 'express';
import cors from 'cors';
//const cors = require('cors');
import pool from './db.js';

const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.listen(5000, () => {
  console.log('server has started on port 5000');
});
//get all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM product_cat');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a product

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM product_cat WHERE product_id = $1',
      [id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
