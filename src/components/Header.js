import React from 'react';
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <h1 className="site-title">Science Trivia</h1>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    width: 100%;
    h1 {
        font-size: 20px;
        font-weight: 800;
        opacity: .6;
    }
`;

export default Header;