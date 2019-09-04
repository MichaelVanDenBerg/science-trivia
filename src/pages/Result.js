import React from 'react';
import { withRouter } from 'react-router-dom';

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
            <div className="wrapper">
                <button className="next" onClick={(e) => restart()}>Restart</button>
            </div>
        </>
    );
}

export default withRouter(Result);