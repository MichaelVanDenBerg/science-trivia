import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
    return (
        <>
            <h1>Hello</h1>
            <Link to="/trivia">Go to Trivia</Link>
        </>);
}

export default Welcome;