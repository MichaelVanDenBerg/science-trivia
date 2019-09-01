import React from 'react';
import styled from "styled-components";

const ButtonNext = ({ children }) => {
    return (
        <ButtonWrapper>
            <StyledButton>{children}</StyledButton>
        </ButtonWrapper>
    );
}

const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
`;

const StyledButton = styled.button`
    border: 0;
    border-radius: 40px;
    cursor: pointer;
    padding: 20px 50px;
    font-size: 1.75em;
    font-weight: bold;
    color: #fffafa;
    background: linear-gradient(to right, #155799, #159957);
`;

export default ButtonNext;
