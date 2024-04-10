import express from "express";
import { requireAuthDirective } from "./modules/middleware";

const { ApolloServer } = require("apollo-server");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");


const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"));
const typeDefsArray = loadFilesSync(path.join(__dirname, "./schema"));

const resolver = mergeResolvers(resolversArray);
const typeDefs = mergeTypeDefs(typeDefsArray);
const app = express();

const server = new ApolloServer({
  typeDefs,
  schemaDirectives: {
    requireAuth: requireAuthDirective,
  },
  resolvers: resolver,
  context: ({ req }) => {
    return { req };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
