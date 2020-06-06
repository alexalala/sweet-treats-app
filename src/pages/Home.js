import React from 'react';

import LinkButton from '../components/simple/LinkButton';
import { ButtonContainer } from '../components/simple/FormElements';

function Home() {
    return (
        <div>
            <h2>Welcome to Sweet Treats Delivered!</h2>
            <h3>Here you can purchase some sweet treats for you or someone you love</h3>
            <ButtonContainer>
                <LinkButton url="/login" text="Log in" />
                <LinkButton url="/signup" text="Sign up" />
            </ButtonContainer>
        </div>
    );
}

export default Home;