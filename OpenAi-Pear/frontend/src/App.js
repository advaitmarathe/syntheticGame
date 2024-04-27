import React, { useState } from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import Home from "./components/Home";  // Assuming Home is saved under components directory
import RandomWikipedia from "./components/RandomWikipedia";

function App() {
  const [showRandomWiki, setShowRandomWiki] = useState(false);
  console.log(showRandomWiki, "akshay")
  return (
    <ChakraProvider>
      <Header />
      {!showRandomWiki ? (
        <Home onStart={() => setShowRandomWiki(true)} />
      ) : (
        <RandomWikipedia />
      )}
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
