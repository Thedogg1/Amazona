import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.user_id,
      name: user.name,
      email: user.email,
      isAdmin: user.isadmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
