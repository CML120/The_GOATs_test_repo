const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    difficulty: String!
    meaning: String
  }

  type User {
    id: ID!
    username: String!
    email: String!

  }

  type Profile {
    id: ID!
  }

  type Query {
    getWord(id: ID!): Word
    getWordsByDifficulty(difficulty: String!): [Word]
    getUserByUsername(username: String!): User
    getProfile(criteria: ProfileCriteriaInput!): Profile
  }

  input ProfileCriteriaInput {
   id: ID!
  }

  type Mutation {
    addWord(word: String!, difficulty: String!, meaning: String): Word
    createUser(username: String!, email: String!, password: String!): User
    addProfile(profileFields: ProfileInput!): Profile
  }

  input ProfileInput {
    id: ID!
  }
`;

module.exports = typeDefs;
