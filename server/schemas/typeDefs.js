const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    difficulty: String!
    meaning: String
    # ... other fields
  }

  type Query {
    getWord(id: ID!): Word
    getWordsByDifficulty(difficulty: String!): [Word]
  }

  type Mutation {
    addWord(word: String!, difficulty: String!, meaning: String): Word
  }
`;

module.exports = typeDefs;
