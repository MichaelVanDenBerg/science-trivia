import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import congrats from '../img/congrats.jpg'; // Photo by Wil Stewart on Unsplash

const Result = ({ history, score, resetScore }) => {
    // Restart the quiz.
    const restart = () => {
        // Reset score to zero.
        resetScore();

        // Return to the first page.
        history.push(`/`);
    }

    return (
        <>
            <p>Congratulations! You've earned {score} out of 10 points!</p>
            <Congrats src={congrats} alt="Congrats with two beers" />
            <div className="wrapper">
                <button className="next" onClick={(e) => restart()}>Restart</button>
            </div>
        </>
    );
}

const Congrats = styled.img`
    max-width: 100%;
    padding-bottom: 24px;
`;

export default withRouter(Result);