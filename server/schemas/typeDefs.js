const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Word {
    _id: ID!
    word: String!
    level: Int!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Profile {
    _id: ID!
    username: String!
    email: String! # Add the email field here
    level: Int!
  }

  type ContactResponse {
    success: Boolean!
    message: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    userByEmail(email: String!): User 
    getUserById(id: ID!): User 
    getWord(id: ID!): Word
    getWordsByDifficulty(level: Int!): [Word]
    getUserByUsername(username: String!): User
    getProfile(criteria: ProfileCriteriaInput!): Profile
    userById(id: ID!): User # Combine the two Query definitions into one
  }

  input ProfileCriteriaInput {
    _id: ID!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addWord(word: String!, level: Int!, meaning: String): Word
    createUser(username: String!, email: String!, password: String!): Auth
    addProfile(profileFields: ProfileInput!): Profile
    updatePlayerLevel(userId: ID!, newLevel: Int!): User
    userById(id: ID!): User

    submitContactForm(contactFields: ContactFormInput!): ContactResponse
  }

  input ProfileInput {
    _id: ID!
    username: String!
  }

  input ContactFormInput {
    firstName: String!
    lastName: String!
    email: String!
    message: String!
  }
`;

module.exports = typeDefs;
