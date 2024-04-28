import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

export function Leaderboard({ articleTitle, isCorrect }) {
  return (
    <Box p="4" borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg">Leaderboard</Heading>
      <Text mt="2" mb="4" fontSize="md" color={isCorrect ? 'green.500' : 'red.500'}>
        {isCorrect ? 'Correct! Well done.' : 'Incorrect! Better luck next time. Correct answer is ' + articleTitle}
      </Text>
      <List spacing={3}>
        {Array.from({ length: 10 }).map((_, index) => (
          <ListItem key={index}>#{index + 1} - </ListItem>
        ))}
      </List>
    </Box>
  );
}
