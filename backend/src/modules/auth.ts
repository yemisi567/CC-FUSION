import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";

// function to compare password
export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// function to hash password
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

// function to create token
export const createJWTToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      businessname: user.businessname,
      exp: Math.floor(Date.now() / 1000) + 1800,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// function to verify token provided from the client
export const verifyToken = (context) => {
  const bearer = context.req.headers.authorization;

  if (!bearer) {
    throw new AuthenticationError("Authorization failed");
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    throw new AuthenticationError("Invalid token");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    context.user = user;
  } catch (err) {
    console.error(err);
    throw new AuthenticationError("Invalid token");
  }
};
