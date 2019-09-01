import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const Welcome = props => {
    // Set local state using hooks.
    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Construct the API url.
    const urlConstructor = () => {
        const cat = category ? `&category=${category}` : ``;
        const dif = difficulty ? `&difficulty=${difficulty}` : ``;
        const urlString = `https://opentdb.com/api.php?amount=10${cat}${dif}`;

        // Update url state.
        setUrl(urlString);
    }

    // Initiate urlConstructor and change page.
    const getStarted = () => {
        urlConstructor();
        //props.history.push("/trivia/1");
    }

    // Get data from the API. Callback function.
    useEffect(() => {
        if (url) {
            console.log(url);
            axios.get(url)
                .then(({ data }) => {
                    // Give error if there aren't enough questions.
                    if (data.response_code !== 0) {
                        setError("There aren't enough questions in this category with this difficulty level. Please try again.");
                    }
                    else {
                        setData(data.results);
                        console.log(data.results);
                    }
                })
                .then(() => {
                    // Transform data so we can use it.
                    function prepareQuestions(test) {
                        console.log(test);
                    }
                    prepareQuestions("testtesttest");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [url]);

    // Get data from the API. Callback function.
    useEffect(() => {
        if (data.length > 0) {
            function prepareQuestions() {
                console.log("asdada", data);
            }
            prepareQuestions(data);
        }
    }, [data]);

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
