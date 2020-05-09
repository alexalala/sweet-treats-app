import React from "react";
import styled from 'styled-components';

function NotFound() {
    return (
        <NotFoundContainer>
            <h3>Sorry, page not found!</h3>
        </NotFoundContainer>
    );
};

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default NotFound;