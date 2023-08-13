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
    {
        profile {
            _id
            level
            username
            email
        }
    }
`;