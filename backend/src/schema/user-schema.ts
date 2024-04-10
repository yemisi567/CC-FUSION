const { gql } = require("apollo-server");

export const typeDefs = gql`
directive @requireAuth on FIELD_DEFINITION

  type User {
    id: ID!
    businessname: String!
    email: String!
    password: String!
    phonenumber: String!
    token: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: ID!): User! @requireAuth
  }

  input CreateUserInput {
    businessname: String!
    email: String!
    password: String!
    phonenumber: String!
  }

  type UserCreationResponse {
    success: Boolean!
    message: String
    token: String
  }

  type Mutation {
    createUser(body: CreateUserInput!): UserCreationResponse!
    signIn(
      businessname: String!
      password: String!
    ): UserCreationResponse!
    deleteUser(id: ID!): User!
  }
`;
