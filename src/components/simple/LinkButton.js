import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function LinkButton({ url, text }) {
    return (
    <StyledLink to={url}>
        <LinkContainer>
            <span>{text}</span>
        </LinkContainer>
    </StyledLink>
    );
}

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.75rem;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    min-width: 6rem;
    text-transform: uppercase;
    border: 2px solid #323232;
    background-color: transparent;
    width: fit-content;
`;