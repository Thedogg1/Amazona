import express, { json } from 'express';
import cors from 'cors';
import pool from './db.js';
import userRouter from './routes/userRoutes.js';
import { generateToken } from './utils.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

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

//create user

app.post('/register', async (req, res) => {
  let { email, password, Username } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    const newUser = await pool.query(
      'insert into users (email, password, name) values ($1, $2, $3) RETURNING *',
      [email, hashedPassword, Username]
    );
    const token = generateToken(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
     
    });
  }
});

//start the server
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
