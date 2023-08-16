import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, QUERY_USER, QUERY_ME } from '../../utils/queries';
import './Profile.css'

import {
  Container,
  Flex,
  VStack,
  Box,
  Center,
} from '@chakra-ui/react'

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  // Retrieve user info from localStorage
  const userInfo = data?.me || {}
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userInfo.username) {
    return (
      <Flex align="center" justify="center">
        <Center>
        <Container m={40}>
          <Box id='profile-error'>You must be logged in!</Box>
        </Container>
        </Center>
      </Flex>
    )
  }
  return (
    <main style={{ marginTop: '100px' }}>
      <Flex align="center" justify="center">
        <Container>
          <VStack>
            <h1 id="profile-header">Profile</h1>
            {userInfo ? (
              <div>
                <p id='profile-p'>Welcome {userInfo?.username}!</p>
                <p id='profile-p'>Email: {userInfo?.email}</p>
                <p id='profile-p'>Level: {userInfo?.level}</p>
              </div>
            ) : (
              <p>No user info available</p>
            )}
          </VStack>
        </Container>
      </Flex>
    </main>
  );
};

export default Profile;
