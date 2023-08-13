const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Word {
    _id: ID!
    word: String!
    difficulty: String!
    meaning: String
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
    getWord(id: ID!): Word
    getWordsByDifficulty(difficulty: String!): [Word]
    getUserByUsername(username: String!): User
    getProfile(criteria: ProfileCriteriaInput!): Profile
  }

  input ProfileCriteriaInput {
   _id: ID!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addWord(word: String!, difficulty: String!, meaning: String): Word
    createUser(username: String!, email: String!, password: String!): User
    addProfile(profileFields: ProfileInput!): Profile
  }

  input ProfileInput {
    _id: ID!
  }
`;

module.exports = typeDefs;
