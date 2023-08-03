const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    # Define the fields for the Profile type
    # Example:
    # _id: ID
    # name: String
    # skills: [String]!
  }

  type Query {
    # Define your Query fields here
    # Example:
    # profiles: [Profile]!
    # profile(profileId: ID!): Profile
  }

  type Mutation {
    # Define your Mutation fields here
    # Example:
    # addProfile(name: String!): Profile
    # addSkill(profileId: ID!, skill: String!): Profile
    # removeProfile(profileId: ID!): Profile
    # removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;

