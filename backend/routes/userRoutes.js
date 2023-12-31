import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';

import pool from '../db.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',

  expressAsyncHandler(async (req, res) => {
    let { email } = req.body;
    const user = await pool.query('select * from users where email=$1;', [
      email,
    ]);
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.rows[0].password)) {
        res.send({
          _id: user.rows[0].user_id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          isAdmin: user.rows[0].isadmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

export default userRouter;
