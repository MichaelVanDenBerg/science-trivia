import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const Welcome = props => {
    // Set local state using hooks.
    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Construct the API url.
    const urlConstructor = () => {
        const cat = category ? `&category=${category}` : ``;
        const dif = difficulty ? `&difficulty=${difficulty}` : ``;
        const urlString = `https://opentdb.com/api.php?amount=10${cat}${dif}`;

        return urlString;
    }

    // Construct the trivia array.
    const triviaConstructor = ({ response_code, results }) => {
        if (response_code > 0) {
            setError("There aren't enough questions in this category with this difficulty level. Please try again.");
        }
        else {
            const trivia = [];
            results.forEach((item) => {
                trivia.push(prepareQuestions(item));
            });
            return trivia;
        }
    }

    // Prepare each question for the trivia array.
    const prepareQuestions = ({ correct_answer, incorrect_answers, question, type }) => {
        // Fill the question list and the correct answer.
        let questionList = [{ text: correct_answer, correctAnswer: true }];

        // Add the incorrect answers to the question list.
        incorrect_answers.forEach((answer) => {
            questionList.push({ text: answer, correctAnswer: false });
        });

        // Function for shuffling an array.
        const shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]]
            }
            return a
        };

        // Shuffle the answerList for multiple choice questions.
        if (type === "multiple") {
            questionList = shuffle(questionList);
        }

        // Otherwise make sure true is always the first option.
        else {
            const temp = [];
            questionList.forEach((item) => {
                item.text === "True" ? temp.unshift(item) : temp.push(item);
            });
            questionList = temp;
        }

        // Add the question to the question list.
        questionList.unshift({ question: question });

        return questionList;
    }

    // Initiate trivia and change page.
    const getStarted = async () => {
        // Fetch data from API.
        const { data } = await axios.get(urlConstructor());

        // Transform data to something we can use.
        const trivia = await triviaConstructor(data);

        // Update state in parent.
        props.updateTrivia(trivia);

        // Change page and go to the first question.
        if (!error) {
            props.history.push("/trivia/1");
        }
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

            {error ? <div className="error">{error}</div> : ""}

            <div className="wrapper">
                <button className="next" onClick={(e) => getStarted(e)} disabled={category ? false : true}>Start</button>
            </div>
        </>);
}

const Hello = styled.h2`
    margin: 0;
    font-size: 9em;
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
    margin-top: 8px;
    margin-bottom: 14px;
    border: 4px solid #155799;
    background: transparent;
`

export default withRouter(Welcome);
