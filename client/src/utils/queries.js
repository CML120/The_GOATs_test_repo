import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const GET_PROFILE = gql`
    query {
        profile {
            _id
            level
            username
            email
        }
    }
`;

export const FETCH_WORDS = gql`
  query FetchWords($level: Int!) {
    getWordsByLevel(level: $level) {
      _id
      word
    }
  }
`;

export const UPDATE_PLAYER_LEVEL = gql`
  mutation UpdatePlayerLevel($userId: ID!, $newLevel: Int!) {
    updatePlayerLevel(userId: $userId, newLevel: $newLevel) {
      _id
      username
      email
      level
    }
  }
`;

export const FETCH_WORDS_BY_DIFFICULTY = gql`
  query Query($level: Int!) {
    getWordsByDifficulty(level: $level) {
      word
    }
  }
`;