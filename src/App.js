import React from 'react';
import styledSanitize from 'styled-sanitize';
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <SiteWrapper className="App">
      <GlobalStyle />
      <h1>Test</h1>
    </SiteWrapper>
  );
}

// Global CSS Styles.
const GlobalStyle = createGlobalStyle`
  ${styledSanitize}

  body {
    background: rgb(2,0,36);
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

// Background gradient animation.
const AnimateGradient = keyframes`
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
`;

// Main site container.
const SiteWrapper = styled.div`
   display: grid;
   grid-template-areas:
    "header"
    "main"
    "footer";
    grid-template-rows: auto 1fr auto;
    min-width: 100vw;
    min-height: 100vh;
    background: rgb(2,0,36);
    background: linear-gradient(135deg, #24243e, #302b63, #0f0c29 100%);
    background-size: 400%;
    animation: ${AnimateGradient} 5s infinite alternate;
`;

export default App;