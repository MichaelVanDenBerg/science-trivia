import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonNext from '../components/ButtonNext'

const Welcome = props => {
    // Set local state using hooks.
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Construct the API url.
    const urlConstructor = () => {
        const cat = category ? `&category=${category}` : ``;
        const dif = difficulty ? `&difficulty=${difficulty}` : ``;
        const urlString = `https://opentdb.com/api.php?amount=10${cat}${dif}`;
        console.log(urlString);
        // Update url in parent component.
        props.updateUrl(urlString);
    }

    // Initiate urlConstructor and change page.
    const getStarted = (e) => {
        console.log("TEST");
        e.preventDefault();
        urlConstructor();
        //props.history.push("/trivia");
    }

    return (
        <>
            <Hello>Hello</Hello>
            <SubTitle>Welcome to Science Trivia!</SubTitle>
            <Intro>Select a category and press "Start".</Intro>
            <button className="selector" onClick={() => setCategory(17)}>Science & Nature</button>
            <button className="selector" onClick={() => setCategory(18)}>Science & Computers</button>
            <button className="selector" onClick={() => setCategory(19)}>Science & Mathemathics</button>
            <button className="selector" onClick={() => setCategory(30)}>Science & Gadgets</button>
            <button className="selector" onClick={() => setCategory(23)}>Science & History</button>
            <Select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="">Random</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </Select>
            <h2>Cat: {category}</h2>
            <h2>Dif: {difficulty}</h2>
            <div className="wrapper">
                <button className="next" onClick={(e) => getStarted(e)}>Start</button>
            </div>
        </>);
}

const Hello = styled.h2`
    margin: 0;
    font-size: 10em;
    font-weight: 800;
    text-align: center;
    letter-spacing: -10px;
    color: #fffafa;
    background: linear-gradient(to right, #155799, #159957);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
`

const SubTitle = styled.p`
    font-size: 28px;
    opacity: 0.6;
`;

const Intro = styled.p`
    line-height: 1.6;
`;

const Select = styled.select`
    height: 2.5rem;
    border-radius: 0;
`

export default Welcome;
