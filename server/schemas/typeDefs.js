const { gql } = require('apollo-server-express');

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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    getWord(id: ID!): Word
    getWordsByDifficulty(level: Int!): [Word]
    getUserByUsername(username: String!): User
    getProfile(criteria: ProfileCriteriaInput!): Profile
  }

  input ProfileCriteriaInput {
   _id: ID!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addWord(word: String!, level: Int!, meaning: String): Word
    createUser(username: String!, email: String!, password: String!): Auth
    addProfile(profileFields: ProfileInput!): Profile
  }

  input ProfileInput {
    _id: ID!
  }

  type Mutation {
    updatePlayerLevel(userId: ID!, newLevel: Int!): User
  }
  
`;

module.exports = typeDefs;
