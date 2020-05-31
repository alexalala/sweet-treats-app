import React from "react";
import styled from 'styled-components';

import { ReactComponent as LoadingSpinner } from '../../assets/loading-spinner.svg';

export default function Button({ isLoading=false, disabled=false, ...props }) {
    return (
    <StyledButton
        disabled={disabled || isLoading}
        {...props}
    >
        { isLoading && 
            <LoadingSpinner />
        }
        {props.children}
    </StyledButton>
    );
}

const StyledButton = styled.button`
    justify-content: center;
    height: 3rem;
    padding: 0.75rem;
    margin: 0.5rem auto;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    min-width: 6rem;
    text-transform: uppercase;
    border: 2px solid #323232;
    background-color: transparent;
    display: flex;
    align-items: center;

    &:hover {
        background: #f3f2f2;
    }

    &:disabled {
        border-color: #b3b3b3;
        color: #b3b3b3;s
    }
`;