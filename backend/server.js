import express from 'express';
import cors from 'cors';
import pool from './db.js';
import pkg from 'bcryptjs';
import { generateToken } from './utils.js';
import expressAsyncHandler from 'express-async-handler';

const app = express();
const { hash } = pkg;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    const newUser = await pool.query(
      'insert into users (email, password) values ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

//auhtenticate the user

app.post(
  'user/signin',
  expressAsyncHandler(async (req, res) => {
    const { email } = req.params;

    const user = await pool.query('select * from users where email=$1', [
      email,
    ]);

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

//returns the error message to the user.  Implemented for authentication purposes.
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

//start the server
app.listen(5000, () => {
  console.log('server has started on port 5000');
});
