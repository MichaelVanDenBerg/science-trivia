import React, { useState } from 'react';
import styledSanitize from 'styled-sanitize';
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import useRouter from './useRouter';
import Welcome from './pages/Welcome';
import Trivia from './pages/Trivia';
import Result from './pages/Result';

function App() {
  // Set local state using hooks.
  const [url, setUrl] = useState("");
  const [score, setScore] = useState(0);

  // Update url received from Home.
  const updateUrl = (urlString) => {
    setUrl(urlString);
  };

  // Keep track of correct answers.
  const updateScore = () => {
    const temp = score + 1;
    setScore(temp);
  };

  // Reset score to zero.
  const resetScore = () => {
    setScore(0);
  };

  // Get location from custom hook.
  const { location } = useRouter();

  // Set page transitions.
  const transitions = useTransition(location, location => location.key, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: '100%',
      transform: 'translate3d(100%, 0, 0)'
    },
    enter: {
      opacity: 1, transform: 'translate3d(0, 0, 0)'
    },
    leave: {
      opacity: 0, transform: 'translate3d(-50%, 0, 0)'
    }
  });

  return transitions.map(({ props, key, item }) => (
    <animated.div key={key} style={props}>
      <SiteWrapper className="App">
        <GlobalStyle />
        <Switch location={item}>
          <Route exact path='/' render={(props) => <Welcome {...props} updateUrl={updateUrl} />} />
          <Route path='/trivia' render={(props) => <Trivia {...props} apiUrl={url} updateScore={updateScore} />} />
          <Route path='/result' render={(props) => <Result {...props} score={score} resetScore={resetScore} />} />
        </Switch>
      </SiteWrapper>
    </animated.div>
  ));
}

// Global CSS Styles.
const GlobalStyle = createGlobalStyle`
  ${styledSanitize}

  body {
    min-width: 100vw;
    min-height: 100vh;
    font-family: 'Open Sans', sans-serif;
    color: #fffafa;
    background: rgb(2,0,36);
    background: linear-gradient(to right, #0f0c29, #24243e, #0f0c29);
  }
`;

// Main site container.
const SiteWrapper = styled.div`
  margin: 0 auto;
  max-width: 820px;
  min-height: 100vh;
`;

export default App;