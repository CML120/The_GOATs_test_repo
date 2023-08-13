import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './Login.css';

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

import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="" id='loginForm'>
      <Flex>
        <Center width={"100vw"}>
            <Container height={"25vh"}>
            <VStack spacing='1vh'>
              <Box>
                Login
              </Box>
              </VStack>
              <VStack spacing='1vh'>
              <Box>
                {data ? (
                  <Box>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </Box>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <Box>
                      <label for="Input1" class="form-label">Email: </label>
                      <input
                        className=""
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box>
                      <label for="Input2" class="form-label">Password: </label>
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
                </Box>
              </VStack>
            </Container>
        </Center>
      </Flex>
    </main>
  );
};

export default Login;
