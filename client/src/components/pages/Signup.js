import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';

import './Signup.css';

import Auth from '../../utils/auth';

import {
  Input,
  Button,
  Container,
  Box,
  Flex,
  Center,
  Stack,
  VStack,
  Spacer,
} from '@chakra-ui/react'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
console.log(data);
      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main id="signupForm"className="">
      <Flex>
        <Center width={"100vw"}>
        <VStack spacing='1vh'>
          <h1 className="">Sign Up</h1>
          <div className="">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                 <Box>
                <label for="Input1" class="form-label">Username: </label>
                <input
                  className=""
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                </Box>
                <Spacer />
                <Box>
                <label for="Input2" class="form-label">Email: </label>
                <input
                  className=""
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </Box>
                <Spacer />
                <Box>
                <label for="Input3" class="form-label">Password: </label>
                <input
                  className=""
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </Box>
                <Spacer />
                    <Box>
                      <Button size='lg' borderRadius='lg' bg='black' color='white'
                        className=""
                        style={{ cursor: 'pointer' }}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                    <Spacer />
              </form>
            )}

            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </div>
          </VStack>
        </Center>
      </Flex>
    </main>
  );
};

export default Signup;
