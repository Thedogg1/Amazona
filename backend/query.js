import pg from 'pg';
//const { Pool } = pg;

const pool = new pg.Pool({
  user: 'postgres',
  password: 'Bollocks',
  host: 'localhost',
  post: 5432,
  database: 'ecommerceapi',
});

//Get all products
const getProducts = (req, res) => {
  pool.query('select * from product_cat', (error, results) => {
    if (error) {
      throw error;
    }
    //res.status(200).json(results.rows);
    res.send(results);
  });
};

//get product by id
const getProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM product_cat WHERE product_id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//get product by slug
const getProductbySlug = (request, response) => {
  const slug = 'addidas-fit-shirt';

  pool.query(
    'SELECT * FROM product_cat WHERE slug = $1',
    [slug],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//post a new product
const createProduct = (request, response) => {
  const { name, releaseDate } = request.body;

  pool.query(
    'INSERT INTO product (name, release_date) VALUES ($1, $2) RETURNING *',
    [name, releaseDate],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Product added with ID: ${results.rows[0].movie_id}`);
    }
  );
};
//update a product
const updateProduct = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  pool.query(
    'UPDATE product SET name = $1 WHERE product_id =$2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.json('product updated');
    }
  );
};

//delete a product
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM product WHERE product_id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Product deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductbySlug,
};
