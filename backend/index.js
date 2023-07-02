import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// home screen
app.get('/', async (req, res) => {
  try {
    const allProducts = await pool.query('select * from product_cat');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all products

app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query('select * from product_cat');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a product

app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const oneProduct = await pool.query(
      'select * from product_cat where product_id=$1',
      [id]
    );
    res.json(oneProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a product by slug

app.get('/product/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const oneProduct = await pool.query(
      'select * from product_cat where slug=$1',
      [slug]
    );
    res.json(oneProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//start the server
app.listen(5000, () => {
  console.log('server has started on port 5000');
});
