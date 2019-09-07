import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import parse from 'html-react-parser';
import styled from "styled-components";

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

    // Reveal answers after click.
    useEffect(() => {
        const container = document.querySelector('#answers-container');

        // Event listener for button clicked.
        container.addEventListener('click', (e) => {
            container.classList.add("reveal");
            e.target.classList.add("clicked");
        });
    }) // Not optimal, should improve this.

    // Check if answer is correct.
    const checkAnswer = (check, key) => {
        // Check for errors.
        if (check !== undefined) {
            setAnswered(true);
        }
        // Update score for correct answer.
        if (check === true) {
            updateScore();

        }
        // Disable buttons.
        setDisabled(true);
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

            <Container id="answers-container">
                {currentAnswers.map((item, key) => (
                    <button
                        id={key}
                        key={key}
                        className={`selector ${item.correctAnswer ? "correct" : "incorrect"}`}
                        disabled={disabled ? true : false}
                        onClick={() => checkAnswer(item.correctAnswer, key)}>
                        {parse(item.text)}
                    </button>
                ))}
            </Container>

            {error ? <><div className="error">{error}</div> <Link to="/">Go to Home</Link></> : ""}

            <div className="wrapper">
                <button className="next" onClick={(e) => nextQuestion(e)} disabled={answered ? false : true}>Next</button>
            </div>
        </>
    );
}

const Container = styled.div`
    &.reveal {
        button {
            opacity: 0.4;

            &.clicked {
                opacity: 1;
                color: #fffafa;
            }
            &.correct {
                border-color: #00a693;
            }
            &.incorrect {
                border-color: #da2c43;
            }
        }
    }
`;

export default withRouter(Trivia);