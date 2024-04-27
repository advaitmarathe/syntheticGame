import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Link,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';

function RandomWikipedia() {
  const [article, setArticle] = useState({ title: '', summary: '', content: '', url: '', closest: [] });
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const toast = useToast();

  const fetchRandomArticle = async () => {
    try {
      const response = await fetch('http://localhost:8000/random_wikipedia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Randomize options
      const closestData = [...JSON.parse(data.closest).CONCEPTS, data.title];
      console.log(closestData);
      setArticle({ title: data.title, summary: data.summary, content: data.content, url: data.url, closest: closestData });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Submission received!",
      description: "Thanks for your response.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mt={5}>Text Synthetic Game</Heading>
        <Button colorScheme="teal" onClick={fetchRandomArticle}>Load Article</Button>
        {article.content && (
          <>
            <Heading as="h3" size="md">Summary</Heading>
            <Text>{article.summary}</Text>
            <Heading as="h3" size="md">Select the closest related concept:</Heading>
            <RadioGroup onChange={setAnswer} value={answer}>
              <Stack direction="column">
                {article.closest.map((item, index) => (
                  <Radio key={index} value={item}>{item}</Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Heading as="h3" size="md">Why do you think this is the correct source?</Heading>
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </VStack>
    </Container>
  );
}

export default RandomWikipedia;
