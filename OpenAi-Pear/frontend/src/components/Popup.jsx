import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function Popup({ onStart, onReconsider, reconsiderUrl }) {
  const handleStart = () => {
    onStart();
  };

  const handleReconsider = () => {
    window.location.href = reconsiderUrl; // Redirect to the provided URL
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Box
        p="2rem"
        bg="white"
        borderRadius="md"
        boxShadow="2xl"
        w="full"
        maxW="xl"
        textAlign="center"
      >
        <Text fontSize="3xl" mb={2} fontWeight="bold">
          Ready to learn something new?
        </Text>
        <Text fontSize="xl" mb={6}>
          Become the one friend who always has an interesting tidbit to say!
        </Text>
        <Flex justify="space-between" w="full" px={12}>
          <Button
            colorScheme="green"
            size="lg"
            onClick={handleStart}
            mr={3} // Adding margin right to the first button
          >
            Start Learning
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            onClick={handleReconsider}
            ml={3} // Adding margin left to the second button
          >
            Disappoint Justin Quan!
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Popup;
