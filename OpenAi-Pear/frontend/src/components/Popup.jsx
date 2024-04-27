import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

function Popup({ onStart, onReconsider, reconsiderUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const handleStart = () => {
    onClose();
    onStart();
  };

  const handleReconsider = () => {
    window.location.href = reconsiderUrl; // Redirect to the provided URL
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered closeOnOverlayClick={false} closeOnEsc={false} size="xl">
      <ModalOverlay
        style={{ 
          background: "linear-gradient(to right, #89CFF0, #F08080)" // Gradient from light blue to light red
        }}
      />
      <ModalContent
        p="2rem"
      >
        <ModalHeader fontSize="2xl">Ready to learn something new?</ModalHeader>
        <ModalBody>
          <Text mb={6} fontSize="xl">Become the one friend who always has an interesting tidbit to say!</Text>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button colorScheme="green" size="lg" onClick={handleStart}>
            Start Learning
          </Button>
          <Button colorScheme="red" size="lg" onClick={handleReconsider}>
            Disappoint Justin Quan!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Popup;
