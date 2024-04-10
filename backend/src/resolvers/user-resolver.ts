const { AuthenticationError } = require("apollo-server");
import prisma from "../db";
import {
  comparePassword,
  createJWTToken,
  hashPassword,
  verifyToken,
} from "../modules/auth";

const _ = require("lodash");

export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      verifyToken(context);
      return await prisma.user.findMany();
    },
    user: async (parent, args, context) => {
      const id = args.id;
      verifyToken(context);
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    },
  },

  Mutation: {
    createUser: async (_, args, context) => {
      try {
        const newUser = await prisma.user.create({
          data: {
            businessname: args.body.businessname,
            email: args.body.email,
            password: await hashPassword(args.body.password),
            phonenumber: args.body.phonenumber,
          },
        });

        const token = await createJWTToken(newUser);

        return {
          success: true,
          message: "User created successfully",
          token,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to create user",
          user: null,
          token: null,
        };
      }
    },
    signIn: async (_, args, context) => {
      try {
        const newUser = await prisma.user.findUnique({
          where: {
            businessname: args.businessname,
          },
        });

        if (!newUser) {
          return {
            success: false,
            message: "User not found",
            token: null,
          };
        }

        const isValid = await comparePassword(args.password, newUser.password);

        if (!isValid) {
          return {
            success: false,
            message: "Invalid password",
            token: null,
          };
        }

        if (isValid) {
          const token = await createJWTToken(newUser);
          return {
            success: true,
            message: "User signed in successfully",
            token,
          };
        }
      } catch (error) {
        return {
          success: false,
          message: "Failed to sign user in",
          token: null,
        };
      }
    },

    deleteUser: async (parent, args, context) => {
      try {
        const id = args.id;
        verifyToken(context);
        // Check if the user exists
        const userToDelete = await prisma.user.findUnique({
          where: {
            id: id,
          },
        });

        if (!userToDelete) {
          // Throw an error if the user is not found
          throw new Error("User not found");
        }

        // Delete the user
        const deletedUser = await prisma.user.delete({
          where: {
            id: id,
          },
        });
        return deletedUser;
      } catch (err) {}
    },
  },
};
