import React from "react";
import styled from 'styled-components';

import { ReactComponent as NotFoundImg } from '../assets/404.svg';

function NotFound() {
    return (
        <NotFoundContainer>
            <NotFoundImg />
            <h3>Sorry, page not found!</h3>
        </NotFoundContainer>
    );
};

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 60vh;
    margin-top: 10vh;
    font-size: 1.5rem;
`;

export default NotFound;