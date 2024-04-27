import React, { useState } from "react";
import { render } from 'react-dom';
import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";

import Header from "./components/Header";
import Todos from "./components/Todos";
import RandomWikipedia from "./components/RandomWikipedia";
import Popup from "./components/Popup";  // Make sure the path is correct

// Extending the theme to include global styles
const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        height: "100%",
        margin: 0,
        padding: 0,
        background: "linear-gradient(to right, #89CFF0, #F08080)"  // Gradient background
      }
    }
  }
});

function App() {
  const [showRandomWiki, setShowRandomWiki] = useState(false);  // State to control display of RandomWikipedia

  const handleStart = () => {
    setShowRandomWiki(true);  // Set to true when Start is clicked
  };

  const handleReconsider = () => {
    setShowRandomWiki(false);  // Optional: Set to false when Reconsider is clicked
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh" align="center" justify="center">
        {!showRandomWiki && <Popup onStart={handleStart} onReconsider={handleReconsider} />}
        {showRandomWiki && <RandomWikipedia />}
      </Flex>
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
