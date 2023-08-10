const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    difficulty: String!
    meaning: String
    # ... other fields
  }

  type User {
    id: ID!
    username: String!
    studentname: String!
    email: String!
    # ... other fields
  }

  type Profile {
    id: ID!
    # Define the fields for the Profile type
    # Example:
    # name: String!
    # skills: [String!]
  }

  type Query {
    getWord(id: ID!): Word
    getWordsByDifficulty(difficulty: String!): [Word]
    getUserByUsername(username: String!): User
    # Add a new query to get a profile by some criteria
    getProfile(criteria: ProfileCriteriaInput!): Profile
  }

  input ProfileCriteriaInput {
    # Define the criteria fields for querying a profile
    # Example:
    # name: String
    # skill: String
  }

  type Mutation {
    addWord(word: String!, difficulty: String!, meaning: String): Word
    addUser(username: String!, studentname: String!, email: String!, password: String!): User
    # Add a new mutation to add a profile
    addProfile(profileFields: ProfileInput!): Profile
  }

  input ProfileInput {
    # Define the input fields for adding a profile
    # Example:
    # name: String!
    # skills: [String!]
  }
`;

module.exports = typeDefs;
