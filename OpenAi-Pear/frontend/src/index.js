import React, { useState } from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import Todos from "./components/Todos";
import RandomWikipedia from "./components/RandomWikipedia";
import Popup from "./components/Popup";  // Make sure the path is correct

function App() {
  const [showRandomWiki, setShowRandomWiki] = useState(false);  // State to control display of RandomWikipedia

  const handleStart = () => {
    setShowRandomWiki(true);  // Set to true when Start is clicked
  };

  const handleReconsider = () => {
    setShowRandomWiki(false);  // Optional: Set to false when Reconsider is clicked
  };

  return (
    <ChakraProvider>
      {!showRandomWiki && <Popup onStart={handleStart} onReconsider={handleReconsider} />}
      {showRandomWiki && <RandomWikipedia />}
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
