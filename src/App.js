import React, { useState } from 'react';
import styledSanitize from 'styled-sanitize';
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import useRouter from './useRouter';
import Header from './components/Header'
import Welcome from './pages/Welcome';
import Trivia from './pages/Trivia';
import Result from './pages/Result';

function App() {
  // Set local state using hooks.
  const [score, setScore] = useState(0);
  const [trivia, setTrivia] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // Update trivia data.
  const updateTrivia = (questions) => {
    setTrivia(questions);
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

  // Keep track of the current question.
  const updateCurrentQuestion = () => {
    const temp = currentQuestion + 1;
    setCurrentQuestion(temp);
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
        <Header />
        <Switch location={item}>
          <Route exact path='/' render={(props) => <Welcome {...props} updateTrivia={updateTrivia} />} />
          <Route path='/trivia/:id' render={(props) => <Trivia {...props} updateScore={updateScore} trivia={trivia} updateCurrentQuestion={updateCurrentQuestion} />} />
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
    padding: 0 12px;
    min-width: 100vw;
    min-height: 100vh;
    font-size: 22px;
    font-family: 'Open Sans', sans-serif;
    color: #fffafa;
    background: rgb(2,0,36);
    background: linear-gradient(to right, #0f0c29, #24243e, #0f0c29);

    p {
      line-height: 1.5;
    }

    button {
      opacity: 0.8;
      transition: all 0.2s ease-in-out;
      box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.25);

      &:hover {
        opacity: 1;
        box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.5);
      }
    }

    .selector {
      display: block;
      width: 100%;
      color: #fffafa;
      cursor: pointer;
      
      padding: 12px 16px;
      margin-bottom: 14px;
      border-radius: 10px;
      background: transparent;
      border: 4px solid #155799;

      &:hover {
        opacity: 1;
      }

      &:disabled {
        color: #6699CC;
        border-color: #002466;
      }
    }

    .next {
      border: 0;
      border-radius: 40px;
      cursor: pointer;
      padding: 20px 50px;
      margin-top: 35px
      font-size: 1.75em;
      font-weight: bold;
      color: #fffafa;
      background: linear-gradient(to right, #155799, #159957);

      &:disabled {
        opacity: 0.5;
        box-shadow: none;
        background: linear-gradient(to right, #292E49, #536976, #BBD2C5);
      }
    }

    .wrapper {
      width: 100%;
      text-align: center;
    }
  }
`;

// Main site container.
const SiteWrapper = styled.div`
  margin: 0 auto;
  padding: 1em;
  max-width: 580px;
  min-height: 100vh;
`;

export default App;