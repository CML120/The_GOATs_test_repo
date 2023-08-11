import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const style = {
  upperStyle: {
    backgroundColor: "#290c0c",
    color: "white",
    padding: "1%",
    textAlign: "center",
  },
  lowerStyle: {
    textAlign: "center",
  },
};

export default function Footer() {
  return (
    <footer style={style.upperStyle}>
      <div>
        <Flex>
          <Box>
            <Link to="/">
              <h4>About</h4>
            </Link>
            <Link to="/spellinggame">
              <h4>Spelling Game</h4>
            </Link>
            <Link to="/letters">
              <h4>Letters</h4>
            </Link>
            <Link to="/phonetics">
              <h4>Phonetics</h4>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <a>
              <h4>Buy us a cup of coffee</h4>
            </a>
          </Box>
          <Spacer />
          <Box marginRight="1%">
            <Link to="/contact">
              <h4>Contact us</h4>
            </Link>
          </Box>
        </Flex>
        <Divider orientation="horizontal" />
        <div style={style.lowerStyle}>
          <VStack>
            <Container>Powered with </Container>
            <Container>&copy; 2023</Container>
          </VStack>
        </div>
      </div>
    </footer>
  );
}
