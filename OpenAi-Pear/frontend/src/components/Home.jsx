import React from 'react';
import { Box, Button, Text, VStack } from "@chakra-ui/react";

export function Home({ onStart }) {
  return (
    <VStack spacing={4}>
      <Box p={5} shadow='md' borderWidth='1px'>
        <Text fontSize='2xl'>Ready to learn something new?</Text>
      </Box>
      <Button colorScheme='green' onClick={onStart}>Start</Button>
      <Button colorScheme='red'>Reconsider your life decisions</Button>
    </VStack>
  );
}
