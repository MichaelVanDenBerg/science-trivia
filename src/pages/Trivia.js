import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";
import parse from 'html-react-parser';

const Trivia = ({ match, trivia, history, updateScore }) => {
    // Set local state using hooks.
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [currentAnswers, setCurrentAnswers] = useState([{ text: "", correctAnswer: undefined }]);
    const [currentQuestion, setCurrentQuestion] = useState("");

    // Populate local state with current question.
    useEffect(() => {
        if (trivia.length > 0) {
            console.log(trivia);
            const current = trivia[match.params.id - 1];
            const { question } = current.shift();
            const answers = current;
            setCurrentAnswers(answers);
            setCurrentQuestion(question);
        }
        else {
            setError("Something went wrong. Please return to the start page.");
        }
    }, [match.params.id, trivia])

    // Check if answer is correct.
    const checkAnswer = (check) => {
        // Check for errors.
        if (check !== undefined) {
            setAnswered(true);
        }
        // Update score for correct answer.
        if (check === true) {
            updateScore();
            setDisabled(true);
        }
        if (check === false) {
            setDisabled(true);
        }
    }

    // Go the next page/question.
    const nextQuestion = (e) => {
        // The next question ID.
        const next = parseInt(match.params.id) + 1;

        // We only have 10 questions.
        if (next <= 10) {
            history.push(`/trivia/${next}`);
        }
        // After that go to the results.
        else {
            history.push(`/result`);
        }
    }

    return (
        <>
            <p>Question #{match.params.id}</p>
            <p>{parse(currentQuestion)}</p>

            {currentAnswers.map((item, key) => (
                <button
                    key={key}
                    className="selector"
                    disabled={disabled ? true : false}
                    onClick={() => checkAnswer(item.correctAnswer)}>
                    {parse(item.text)}
                </button>
            ))}

            {error ? <><div className="error">{error}</div> <Link to="/">Go to Home</Link></> : ""}

            <div className="wrapper">
                <button className="next" onClick={(e) => nextQuestion(e)} disabled={answered ? false : true}>Next</button>
            </div>
        </>
    );
}

export default withRouter(Trivia);