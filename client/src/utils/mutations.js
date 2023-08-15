import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
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

export const ADD_CONTACT = gql`
  mutation SubmitContactForm($input: ContactFormInput!) {
    submitContactForm(input: $input) {
      success
      message
    }
  }
`;
