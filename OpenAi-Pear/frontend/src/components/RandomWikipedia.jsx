import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Spinner,
  Center,
  List,
  ListItem,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaCopy, FaAward } from 'react-icons/fa';

function ShareModal({ isOpen, onClose, title }) {
  const toast = useToast();

  const handleShare = (platform) => {
    // Example function that simulates sharing and provides feedback
    toast({
      title: `Shared on ${platform}!`,
      description: "Thanks for sharing! You've earned 10 points.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose(); // Close the modal after sharing
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`Check out this interesting topic: ${title}`).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Now paste it anywhere you like to share.",
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share what you learned about "{title}" with others!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize="lg" textAlign="center">
            Sharing is caring! 
          </Text>
          <Center>
            <IconButton
              icon={<FaTwitter />}
              aria-label="Share on Twitter"
              colorScheme="twitter"
              m={2}
              onClick={() => handleShare('Twitter')}
            />
            <IconButton
              icon={<FaFacebook />}
              aria-label="Share on Facebook"
              colorScheme="facebook"
              m={2}
              onClick={() => handleShare('Facebook')}
            />
            <IconButton
              icon={<FaCopy />}
              aria-label="Copy to clipboard"
              colorScheme="teal"
              m={2}
              onClick={handleCopyToClipboard}
            />
          </Center>
          {/* <Center mt={4}>
            <Button leftIcon={<FaAward />} colorScheme="pink" onClick={onClose}>
              Check awards
            </Button>
          </Center> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}


// Arrays of sample first and last names
const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Skyler', 'Quinn', 'Peyton', 'Avery', 'Riley'];
const lastNames = ['Smith', 'J.', 'Williams', 'B.', 'Jones', 'Garcia', 'M.', 'Davis', 'Rodriguez', 'W.'];

// Function to generate a random name
const getRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
};

// Generating dummy data with names and scores, and sorting them by score in descending order
const sampleLeaderboardData = Array.from({ length: 10 }).map((_, index) => ({
  name: getRandomName(),
  score: Math.floor(Math.random() * 101)  // Random score between 0 and 100
})).sort((a, b) => b.score - a.score);  // Sorting data in descending order of score

function Leaderboard({ articleTitle, isCorrect }) {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" background={bgColor} borderColor={borderColor} boxShadow="xl">
      <Heading as="h2" size="lg" textAlign="center" mb="4">
        Leaderboard
      </Heading>
      <Text mt="2" mb="4" fontSize="md" color={isCorrect ? 'green.500' : 'red.500'} textAlign="center">
        {isCorrect ? 'Correct! 🎉' : 'Incorrect! Better luck next time. Correct answer is ' + articleTitle}

      </Text>
      <List spacing={3}>
        {sampleLeaderboardData.map((item, index) => (
          <ListItem key={index} p="2" boxShadow="md" borderRadius="md" background="white">
            #{index + 1} - {item.name}: {item.score} points
          </ListItem>
        ))}
      </List>
      <Button colorScheme="blue" onClick={onOpen}  width={"full"} marginTop={"10px"}>Share</Button>
            <ShareModal isOpen={isOpen} onClose={onClose} title={articleTitle} />

    </Box>
  );
}

function RandomWikipedia() {
  const [article, setArticle] = useState({ title: '', summary: '', content: '', url: '', closest: [] });
  const [answer, setAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState(false);

  const fetchRandomArticle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/random_wikipedia');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const closestData = [...JSON.parse(data.closest).CONCEPTS, data.title];
      console.log(closestData);
      setArticle({ title: data.title, summary: data.summary, content: data.content, url: data.url, closest: closestData });
      setCorrectAnswer(data.title);
      setIsLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return <Leaderboard articleTitle={article.title} isCorrect={answer === correctAnswer} />;
  }

  return (
    <Container maxW="container.md" centerContent background="white" padding="50px" margin="50px" borderRadius="10px">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mt={5}>Text Synthetic Game</Heading>
        {(!article.content & !isLoading) && <Button colorScheme="teal" onClick={fetchRandomArticle}>Load Article</Button>}
        {isLoading ? (
          <Center w="100%" h="200px">
            <Spinner size="xl" />
          </Center>
        ) : article.content && (
          <>
            <Heading as="h2" size="md">Summary</Heading>
            <Text>{article.summary}</Text>
            <Heading as="h2" size="md">Select the closest related concept:</Heading>
            <RadioGroup onChange={setAnswer} value={answer}>
              <Stack direction="column">
                {article.closest.map((item, index) => (
                  <Radio key={index} value={item}>{item}</Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Heading as="h2" size="md">Challenge Question:</Heading>
            <Heading as="h1" size="md">Why did you choose this?</Heading>
            <Text as='u'>Get on our national leaderboard based on how correct your answer is!!</Text>

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
