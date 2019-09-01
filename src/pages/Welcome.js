import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

const Welcome = props => {
    // Set local state using hooks.
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Construct the API url.
    const urlConstructor = () => {
        const cat = category ? `&category=${category}` : ``;
        const dif = difficulty ? `&difficulty=${difficulty}` : ``;
        const urlString = `https://opentdb.com/api.php?amount=10${cat}${dif}`;

        // Update url in parent component.
        props.updateUrl(urlString);
    }

    // Initiate urlConstructor and change page.
    const getStarted = (e) => {
        e.preventDefault();
        urlConstructor();
        props.history.push("/trivia/1");
    }

    // A list of trivia categories.
    const triviaCategories = [
        {
            'id': 17,
            'name': 'Science & Nature'
        },
        {
            'id': 18,
            'name': 'Science & Computers'
        },
        {
            'id': 19,
            'name': 'Science & Mathemathics'
        },
        {
            'id': 30,
            'name': 'Science & Gadgets'
        },
        {
            'id': 23,
            'name': 'Science & History'
        },
    ]

    return (
        <>
            <Hello>Hello</Hello>
            <SubTitle>Welcome to Science Trivia!</SubTitle>
            <Intro>Select a category and difficulty and press "Start".</Intro>

            {triviaCategories.map((category) =>
                <button className="selector" key={category.id} onClick={() => setCategory(category.id)}>{category.name}</button>
            )}

            <Select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value="">Random</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </Select>

            <div className="wrapper">
                <button className="next" onClick={(e) => getStarted(e)} disabled={category ? false : true}>Start</button>
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
    color: #fffafa;
    margin-bottom: 14px;
    border: 4px solid #155799;
    background: transparent;
`

export default withRouter(Welcome);
